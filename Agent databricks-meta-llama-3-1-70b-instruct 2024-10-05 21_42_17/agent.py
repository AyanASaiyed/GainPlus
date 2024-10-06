# Databricks notebook source
# MAGIC %md
# MAGIC #Agent notebook
# MAGIC
# MAGIC This is an auto-generated notebook created by an AI Playground export. We generated three notebooks in the same folder:
# MAGIC - [**agent**]($./agent): contains the code to build the agent.
# MAGIC - [config.yml]($./config.yml): contains the configurations.
# MAGIC - [driver]($./driver): logs, evaluate, registers, and deploys the agent.
# MAGIC
# MAGIC This notebook uses Mosaic AI Agent Framework ([AWS](https://docs.databricks.com/en/generative-ai/retrieval-augmented-generation.html) | [Azure](https://learn.microsoft.com/en-us/azure/databricks/generative-ai/retrieval-augmented-generation)) to recreate your agent from the AI Playground. It defines a LangChain agent that has access to the tools from the source Playground session.
# MAGIC
# MAGIC Use this notebook to iterate on and modify the agent. For example, you could add more tools or change the system prompt.
# MAGIC
# MAGIC  **_NOTE:_**  This notebook uses LangChain, however AI Agent Framework is compatible with other agent frameworks like Pyfunc and LlamaIndex.
# MAGIC
# MAGIC ## Prerequisites
# MAGIC
# MAGIC - Address all `TODO`s in this notebook.
# MAGIC - Review the contents of [config.yml]($./config.yml) as it defines the tools available to your agent, the LLM endpoint, and the agent prompt.
# MAGIC
# MAGIC ## Next steps
# MAGIC
# MAGIC After testing and iterating on your agent in this notebook, go to the auto-generated [driver]($./driver) notebook in this folder to log, register, and deploy the agent.

# COMMAND ----------

# MAGIC %pip install -U -qqqq mlflow-skinny langchain==0.2.16 langgraph-checkpoint==1.0.12 langchain_core langchain-community==0.2.16 langgraph==0.2.16 pydantic
# MAGIC dbutils.library.restartPython()

# COMMAND ----------

# MAGIC %md
# MAGIC ## Import and setup
# MAGIC
# MAGIC Use `mlflow.langchain.autolog()` to set up [MLflow traces](https://docs.databricks.com/en/mlflow/mlflow-tracing.html).

# COMMAND ----------

import mlflow
from mlflow.models import ModelConfig

mlflow.langchain.autolog()
config = ModelConfig(development_config="config.yml")

# COMMAND ----------

# MAGIC %md
# MAGIC ## Define the chat model and tools
# MAGIC Create a LangChain chat model that supports [LangGraph tool](https://langchain-ai.github.io/langgraph/how-tos/tool-calling/) calling.
# MAGIC
# MAGIC Modify the tools your agent has access to by modifying the `uc_functions` list in [config.yml]($./config.yml). Any non-UC function spec tools can be defined in this notebook. See [LangChain - How to create tools](https://python.langchain.com/v0.2/docs/how_to/custom_tools/) and [LangChain - Using built-in tools](https://python.langchain.com/v0.2/docs/how_to/tools_builtin/).
# MAGIC
# MAGIC  **_NOTE:_**  This notebook uses LangChain, however AI Agent Framework is compatible with other agent frameworks like Pyfunc and LlamaIndex.

# COMMAND ----------

from langchain_community.chat_models import ChatDatabricks
from langchain_community.tools.databricks import UCFunctionToolkit

# Create the llm
llm = ChatDatabricks(endpoint=config.get("llm_endpoint"))

uc_functions = config.get("uc_functions")

uc_function_tools = (
    UCFunctionToolkit(warehouse_id=config.get("warehouse_id"))
    .include(*uc_functions)
    .get_tools()
)



# COMMAND ----------

# MAGIC %md
# MAGIC ## Output parsers
# MAGIC Databricks interfaces, such as the AI Playground, can optionally display pretty-printed tool calls.
# MAGIC
# MAGIC Use the following helper functions to parse the LLM's output into the expected format.

# COMMAND ----------

from typing import Iterator, Dict, Any
from langchain_core.messages import (
    AIMessage,
    HumanMessage,
    ToolMessage,
    MessageLikeRepresentation,
)

import json

uc_functions_set = {x.replace(".", "__") for x in uc_functions}


def is_uc_function(tool_name: str) -> bool:
    """Check if `tool_name` is in `uc_functions` or belongs to a schema from config.yml."""
    if tool_name in uc_functions_set:
        return True
    for pattern in uc_functions_set:
        if "*" in pattern and tool_name.startswith(pattern[:-1]):
            return True
    return False


def stringify_tool_call(tool_call: Dict[str, Any]) -> str:
    """Convert a raw tool call into a formatted string that the playground UI expects"""
    if is_uc_function(tool_call.get("name")):
        request = json.dumps(
            {
                "id": tool_call.get("id"),
                "name": tool_call.get("name"),
                "arguments": json.dumps(tool_call.get("args", {})),
            },
            indent=2,
        )
        return f"<uc_function_call>{request}</uc_function_call>"
    else:
        # for non UC functions, return the string representation of tool calls
        # you can modify this to return a different format
        return str(tool_call)


def stringify_tool_result(tool_msg: ToolMessage) -> str:
    """Convert a ToolMessage into a formatted string that the playground UI expects"""
    if is_uc_function(tool_msg.name):
        result = json.dumps(
            {"id": tool_msg.tool_call_id, "content": tool_msg.content}, indent=2
        )
        return f"<uc_function_result>{result}</uc_function_result>"
    else:
        # for non UC functions, return the string representation of tool message
        # you can modify this to return a different format
        return str(tool_msg)


def parse_message(msg) -> str:
    """Parse different message types into their string representations"""
    # tool call result
    if isinstance(msg, ToolMessage):
        return stringify_tool_result(msg)
    # tool call
    elif isinstance(msg, AIMessage) and msg.tool_calls:
        tool_call_results = [stringify_tool_call(call) for call in msg.tool_calls]
        return "".join(tool_call_results)
    # normal HumanMessage or AIMessage (reasoning or final answer)
    elif isinstance(msg, (AIMessage, HumanMessage)):
        return msg.content
    else:
        print(f"Unexpected message type: {type(msg)}")
        return str(msg)


def wrap_output(stream: Iterator[MessageLikeRepresentation]) -> Iterator[str]:
    """
    Process and yield formatted outputs from the message stream.
    The invoke and stream langchain functions produce different output formats.
    This function handles both cases.
    """
    for event in stream:
        # the agent was called with invoke()
        if "messages" in event:
            for msg in event["messages"]:
                yield parse_message(msg) + "\n\n"
        # the agent was called with stream()
        else:
            for node in event:
                for key, messages in event[node].items():
                    if isinstance(messages, list):
                        for msg in messages:
                            yield parse_message(msg) + "\n\n"
                    else:
                        print("Unexpected value {messages} for key {key}. Expected a list of `MessageLikeRepresentation`'s")
                        yield str(messages)

# COMMAND ----------

# MAGIC %md
# MAGIC ## Create the agent
# MAGIC Use the LangGraph [`create_react_agent` function](https://langchain-ai.github.io/langgraph/how-tos/create-react-agent/#usage) to build a simple graph with the model and tools defined by [config.yml]($./config.yml). For more customization, you can create your own LangGraph agent by following [LangGraph - Quick Start](https://langchain-ai.github.io/langgraph/tutorials/introduction/).

# COMMAND ----------

from langchain_core.runnables import RunnableGenerator
from langgraph.prebuilt import create_react_agent

# Create the agent with the system message if it exists
try:
    system_message = config.get("agent_prompt")
    agent_with_raw_output = create_react_agent(llm, uc_function_tools, state_modifier=system_message)
except KeyError:
    agent_with_raw_output = create_react_agent(llm, uc_function_tools)
agent = agent_with_raw_output | RunnableGenerator(wrap_output)

# COMMAND ----------

# MAGIC %md
# MAGIC ## Test the agent
# MAGIC
# MAGIC Interact with the agent to test its output. Since this notebook called `mlflow.langchain.autolog()` you can view the trace for each step the agent takes.
# MAGIC
# MAGIC Replace this placeholder input with an appropriate domain-specific example for your agent.

# COMMAND ----------

# TODO: replace this placeholder input example with an appropriate domain-specific example for your agent
for event in agent.stream({"messages": [{"role": "user", "content": "What is 5+5 in python?"}]}):
    print(event, "---" * 20 + "\n")

# COMMAND ----------

mlflow.models.set_model(agent)

# COMMAND ----------

# MAGIC %md
# MAGIC ## Next steps
# MAGIC
# MAGIC You can rerun the cells above to iterate and test the agent.
# MAGIC
# MAGIC Go to the auto-generated [driver]($./driver) notebook in this folder to log, register, and deploy the agent.