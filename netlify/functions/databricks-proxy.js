'use strict';

var axios = require('axios');

// Define the chatbot endpoint
const chatbotEndpoint = "https://dbc-9b555a31-b662.cloud.databricks.com/serving-endpoints/agents_gainplus-default-gainplus-coach_model/invocations";
// Define the API key
const apiKey = "dapi6c23348424981c55abbc40973c49d0dc";

// Define the uploadData function
const uploadData = async (data) => {
    try {
        const response = await axios.post('/.netlify/functions/databricks-proxy', data);
        console.log('Response from Databricks:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Define the getChatbotResponse function
const getChatbotResponse = async (message) => {
    try {
        const response = await axios.post(chatbotEndpoint, {
            llm_endpoint: "databricks-meta-llama-3-1-70b-instruct",
            warehouse_id: "9789d6ff88d9eaf8",
            model_name: "gainplus-default-gainplus-coach_model_1",
            inputs: { message: message },
        }, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        console.log("Chatbot Response: ", response.data);

        // Call uploadData function with the chatbot response
        await uploadData(response.data);

        return response.data;
    } catch (error) {
        console.error("Error sending message to chatbot:", error);
    }
};

exports.getChatbotResponse = getChatbotResponse;
