// Need a map to match the class_id to the class_name
import axios from "axios";

const classMap = {
    0: 'ecto',
    1: 'endo',
    2: 'hourglass',
    3: 'invert',
    4: 'man',
    5: 'meso',
    6: 'oval',
    7: 'rect',
    8: 'trapezoid',
    9: 'tri',
    10: 'woman'
}

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const runModel = async (imgBlob) => {
    if (!(imgBlob instanceof Blob)) {
        console.error("Invalid Blob object:", imgBlob);
        return;
    }
    
    const imglink = await blobToBase64(imgBlob);
    console.log("Running model with base64 image: ", imglink);

    axios({
        method: "POST",
        url: "https://detect.roboflow.com/bodymeasure-sotdp/5",
        params: {
            api_key: "TDOTWEzAa3JtoQw2BdLG",
            image: imglink,
        }
    })

    .then(async function(response) {
        console.log("Response data:", response.data); // Log the entire response data

        const pred = response.data.predictions;
        let predarr = [];
        let classes = [];
        console.log("Prediction:", pred);

        //Sort to top 3, need to turn object to array
        if (pred && !Array.isArray(pred)) {
            console.log("Converting predictions to an array.");
            predarr = Object.values(pred);
        }

        //Sort predictions by confidence, clog top 3
        if (predarr && Array.isArray(predarr) && predarr.length > 0) {
            predarr.sort((a, b) => parseFloat(b.confidence) - parseFloat(a.confidence));
        } else {
            console.log("No predictions found or predictions is not an array.");
        }

        console.log("Top 3 predictions:");
        for (let i = 0; i < 3; i++) {
            console.log(classMap[predarr[i].class_id]);
            classes.push(classMap[predarr[i].class_id]);
        }

        //Send classes to the LLM chatbot through a POST request
        //try {
        //    const chatbotResponse = await sendClassesToChatbot(classes);
        //    console.log("Chatbot response:", chatbotResponse);
        //} catch (error) {
        //    console.error("Error sending to chatbot:", error);
        //}
    })

    .catch(function(error) {
        console.error("Error during model inference:", error); // Log any errors
    });
}