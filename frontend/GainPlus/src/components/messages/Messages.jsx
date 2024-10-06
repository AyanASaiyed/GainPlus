import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { getModel } from "../chat/GainPlusModel";
import MessageInput from "./MessageInput";
import { auth } from "../../firebase/firebase"; // Import the auth object

const googleAPIKey = import.meta.env.VITE_GOOGLE_API_KEY;
const fileManager = new GoogleAIFileManager('AIzaSyDd-qpJklgdgNN1JxXCa-qM45s8nYT9sf8');


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [goal, setGoal] = useState(null);
  const [current, setCurrent] = useState(null);
  const [imagesUploaded, setImagesUploaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "messages"),
        where("senderID", "==", auth.currentUser.uid)
      ),
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
      console.log(fetchedMessages);
      setMessages(fetchedMessages);

      if (fetchedMessages.length === 0) {
        setMessages([
          {
            id: "greeting",
            text: "Hello! Please upload images of your goal and current physique to begin.",
            senderID: "GainPlus",
            timestamp: new Date(),
          },
        ]);
      }
    });

    return () => unsubscribe();
  }, []);

  function handleGoal(e) {
    setGoal(URL.createObjectURL(e.target.files[0]));
  }

  function handleCurrent(e) {
    setCurrent(URL.createObjectURL(e.target.files[0]));
  }

  const generateResponse = async (user_messsage) => {
    try {
      let goalImageUri, currentImageUri, classification_result_goal, classification_result_current, classification_result;


      if (!imagesUploaded) {

        const uploadGoal = await fileManager.uploadFile(goal, {
          mimeType: "image/png",
          displayName: "Goal Image",
        });
  
        const uploadCurrent = await fileManager.uploadFile(current, {
          mimeType: "image/png",
          displayName: "Current Image",
        });

        goalImageUri = uploadGoal.file.uri;
        console.log(`Uploaded file ${uploadGoal.file.displayName} as: ${uploadGoal.file.uri}`);
        currentImageUri = uploadCurrent.file.uri;
        console.log(`Uploaded file ${uploadCurrent.file.displayName} as: ${uploadCurrent.file.uri}`);
        
        setImagesUploaded(true);

        // get classification result from roboflow for goal image
        const response = await fetch(
          `https://detect.roboflow.com/bodymeasure-sotdp/5?api_key=TDOTWEzAa3JtoQw2BdLG&image=${goalImageUri}`
        );
        const data = await response.json();
        const pred = data.predictions;
        let predarr = [];
        let classes = [];
        console.log("Prediction:", pred);

        if (pred && !Array.isArray(pred)) {
          console.log("Converting predictions to an array.");
          predarr = Object.values(pred);
        }

        if (predarr && Array.isArray(predarr) && predarr.length > 0) {
          predarr.sort((a, b) => parseFloat(b.confidence) - parseFloat(a.confidence));
        }

        console.log("Top 3 predictions:");

        for (let i = 0; i < 3; i++) {
          console.log(classMap[predarr[i].class_id]);
          classes.push(classMap[predarr[i].class_id]);
        }

        // Format the classification result for the goal image
        classification_result_goal = classes.join(", ");
        classification_result_goal = `The top 3 predictions for your goal image are: ${classification_result_goal}`;

        // get classification result from roboflow for current image
        const response2 = await fetch(
          `https://detect.roboflow.com/bodymeasure-sotdp/5?api_key=TDOTWEzAa3JtoQw2BdLG&image=${currentImageUri}`
        );
        const data2 = await response2.json();
        const pred2 = data2.predictions;
        let predarr2 = [];
        let classes2 = [];
        console.log("Prediction:", pred2);

        if (pred2 && !Array.isArray(pred2)) {
          console.log("Converting predictions to an array.");
          predarr2 = Object.values(pred2);
        }

        if (predarr2 && Array.isArray(predarr2) && predarr2.length > 0) {
          predarr2.sort((a, b) => parseFloat(b.confidence) - parseFloat(a.confidence));
        }

        console.log("Top 3 predictions:");

        for (let i = 0; i < 3; i++) {
          console.log(classMap[predarr2[i].class_id]);
          classes2.push(classMap[predarr2[i].class_id]);
        }

        // Format the classification result for the current image
        classification_result_current = classes2.join(", ");
        classification_result_current = `The top 3 predictions for your current image are: ${classification_result_current}`;

        // combine the classification results for both images
        classification_result = `${classification_result_goal} and ${classification_result_current}`;
      }

      const model = getModel("gemini-1.5-flash");

      const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadGoal.file.mimeType,
            fileUri: uploadGoal.file.uri,
          },
        },
        {
          fileData: {
            mimeType: uploadCurrent.file.mimeType,
            fileUri: uploadCurrent.file.uri,
          },
        },
        { text: classification_result },
        { text: user_messsage },
      ]);

      const model_response = result.response.text();

      await addDoc(collection(db, "messages"), {
        text: model_response,
        senderID: "GainPlus",
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const filteredMessages = messages.filter((message) => message.text);

    const [yourImage, setYourImage] = useState();
    const [desiredImage, setDesiredImage] = useState();
    const [confirm, setConfirm] = useState(false);

//      COMMENT THIS HANDLER AFTER   
    const handleYourImage = (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileType = file.type;
        if (fileType !== "image/jpeg" && fileType !== "image/png") {
          toast.error("Please enter a jpg or png file");
          setCorrectPic(false);
          return;
        } else {
          setCorrectPic(true);
          const reader = new FileReader();
          reader.onloadend = () => {
            setYourImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    };

  //   const handleDesiredImage = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const fileType = file.type;
  //       if (fileType !== "image/jpeg" && fileType !== "image/png") {
  //         toast.error("Please enter a jpg or a png file");
  //         setCorrectGoalPic(false);
  //       } else {
  //         setCorrectGoalPic(true);
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           setDesiredImage(reader.result);
  //         };
  //         reader.readAsDataURL(file);
  //       }
  //     }
  //   };

    const handleConfirm = (event) => {
      if (correctPic == true && correctGoalPic == true) {
        setConfirm(true);
        // if (yourImage) {
        //   runModel(yourImage);
        // }
        // if (desiredImage) {
        //   runModel(desiredImage);
        // }
        if (yourImageFile) {
            const yourImageRef = ref(
              imageDb,
              yourImage/${yourImageFile.name + v4()}
            );
            await uploadBytes(yourImageRef, yourImageFile);
            const yourImageURL = await getDownloadURL(yourImageRef);
            setYourImage(yourImageURL);
          }
          if (desiredImageFile) {
            const desiredImageRef = ref(
              imageDb,
              desiredImage/${desiredImageFile.name + v4()}
            );
            await uploadBytes(desiredImageRef, desiredImageFile);
            const desiredImageURL = await getDownloadURL(desiredImageRef);
            setDesiredImage(desiredImageURL);
          }
      }
    };

  return (
    <div className="flex flex-col h-full w-full overflow-y-scroll chat absolute">
      {/* ENTRY MESSAGE HERE */}
      <div className="pl-4 pt-6 pb-6 rounded-lg bg-black chat-bubble chat-start">
        Please Enter Images of your Goal and Current Physique!
      </div>

      <div className="flex-1 w-full bg-gray-900 p-4 flex flex-col">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`pl-4 pt-2 pb-2 bg-black chat-bubble mb-2 ${
              message.senderID === "GainPlus" ? "self-start" : "self-end"
            }`}
          >
            <p className="text-white">{message.text}</p>
          </div>
        ))}
        {filteredMessages.length === 0 && (
          <p className="text-white text-center">No messages to display.</p>
        )}
      </div>

        <MessageInput generateResponse={generateResponse} handleGoal={handleGoal} handleCurrent={handleCurrent} />

    </div>
  );
};

export default Messages;
