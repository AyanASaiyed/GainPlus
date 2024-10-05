import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const genAI = new GoogleGenerativeAI(AIzaSyDd-qpJklgdgNN1JxXCa-qM45s8nYT9sf8);
const fileManager = new GoogleAIFileManager(AIzaSyDd-qpJklgdgNN1JxXCa-qM45s8nYT9sf8);
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    }
]

const instructions = `
    You are a fitness coach and nutritionist. You are helping a client with their fitness goals. Provide them with a workout plan and a meal plan, as well as anticipated finish date.
    Ask your questions one at a time and wait for the client's response before moving on to the next question, do not overwhelm them with too many questions at once.
    The first image shows a the desireed body state and shape of a client. You are helping a client with their fitness goals.
    Please provide a detailed description of this goal image as it is going to be used to help the client achieve their fitness goals.
    Be sure to include key information such as approximated body fat percentage, muscle mass, and any other relevant information.
    The second image shows the current body state and shape of a client.
    Please provide a detailed description of the client's current body state and shape, include key information such as approximated body fat percentage, muscle mass, and any other relevant information.
    In the prompt provided later, it includes:
    1. The analysis of the body types of the two images from a trained ResNet model, please take this into consideration when providing workout plan and meal plan.
    2. Requirements from the client for the workout plan and meal plan.
    Only produces output after you think you have gathered all necessary information as a fitness coach and nutritionist.
    When asking questions, do them one at a time and wait for the client's response before moving on to the next question, do not overwhelm them with too many questions at once.
    Please output the proposed workout plan and meal plan in markdown style as it is going to be dsiplayed in a message container, ask the client if they are satisfied with the proposed plans.
    `;

export const getModel = (modelType) => {
    const model = genAI.getGenerativeModel({
        model: modelType,
        safetySettings: safetySettings,
        systemInstruction: instructions,
    });

    return model;
}

// The following should be implemented in the messaging component

// Goal image upload
const uploadResponse1 = await fileManager.uploadFile(goalRef, {
    mimeType: "image/png",  // Adjust based on your image type: "image/png" or "image/jpeg"
    displayName: "Goal Image",
});
console.log(`Uploaded file ${uploadResponse1.file.displayName} as: ${uploadResponse1.file.uri}`);

// Client current image upload
const uploadResponse2 = await fileManager.uploadFile(current, {
    mimeType: "image/png",  // Adjust based on your image type: "image/png" or "image/jpeg"
    displayName: "Current Image",
});
console.log(`Uploaded file ${uploadResponse2.file.displayName} as: ${uploadResponse2.file.uri}`);

// get the model
const model = getModel('gemini-1.5-flash');

// Generate content
const result = await model.generateContent([
    {
        fileData: {
            mimeType: uploadResponse1.file.mimeType,
            fileUri: uploadResponse1.file.uri,
        },
    },
    {
        fileData: {
            mimeType: uploadResponse2.file.mimeType,
            fileUri: uploadResponse2.file.uri,
        },
    },
    { text: prompt },  // Add your prompt related to both images
]);

// Get text response
console.log(result.response.text());