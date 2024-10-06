// import axios from "axios";

// const chatbotEndpoint = "https://dbc-9b555a31-b662.cloud.databricks.com/serving-endpoints/agents_gainplus-default-gainplus-coach_model/invocations";
// const api_key = "dapi6c23348424981c55abbc40973c49d0dc";

// export const getChatbotResponse = async (message) => {
//     try {
//         const response = await axios.post(chatbotEndpoint, {
//             llm_endpoint: "databricks-meta-llama-3-1-70b-instruct",
//             warehouse_id: "9789d6ff88d9eaf8" ,
//             model_name: "gainplus-default-gainplus-coach_model_1",
//       inputs: { message: message },
//     }, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//       },
//     });
//     console.log("Chatbot Response: ", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error sending message to chatbot:", error);
//   }
// };