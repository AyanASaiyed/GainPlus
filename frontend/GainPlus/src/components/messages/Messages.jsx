import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth } from "../../firebase/firebase"; // Import the auth object
import { runModel } from "../roboflow/model";
import toast from "react-hot-toast";

const Messages = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "85vh",
      justifyContent: "space-between",
      padding: "1rem",
      rounded: "lg",
    },
    image: {
      width: "150px",
      height: "150px",
    },
    imageStyle: {
      border: "1px solid white",
      width: "300px",
      height: "200px",
      borderStyle: "dashed",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    imageContainer: {
      display: "flex",
    },
    uploadedImageContainer: {
      flexDirection: "column",
      justifyContent: "left",
    },
    newImageUpload: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    imageLabel: {
      fontSize: "30px",
      marginBottom: "10px",
    },
    imageGroup: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      //flexDirection:"row",
      alignItems: "flex-end",
    },
    confirmLabel: {
      marginTop: "10px",
      textAlign: "center",
      border: "2px solid white",
      padding: "10px",
      borderRadius: "22px",
    },
    messagesContainer: {
      flex: 1,
      overflowY: "auto",
      marginBottom: "1rem",
    },
    inputContainer: {
      flexShrink: 0,
    },
    fileInput: {
      display: "none",
    },
  };

  const [messages, setMessages] = useState([]);
//   const [goal, setGoal] = useState(null);
//   const [correctPic, setCorrectPic] = useState(true);
//   const [correctGoalPic, setCorrectGoalPic] = useState(true);
//   const [current, setCurrent] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "messages"),
        where("senderID", "==", auth.currentUser.uid),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedMessages);
        console.log(auth.currentUser.uid);
        setMessages(fetchedMessages);
      }
    );

    return () => unsubscribe();
  }, []);

//   function handleGoal(e) {
//     setGoal(URL.createObjectURL(e.target.files[0]));
//   }

//   function handleCurrent(e) {
//     setCurrent(URL.createObjectURL(e.target.files[0]));
//   }

  const filteredMessages = messages.filter((message) => message.text);

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto">
      {/* ENTRY MESSAGE HERE */}
      <div className="pl-4 pt-1 pb-6 rounded-lg bg-black chat-bubble chat-start">
        Please Enter Images of your Current Physique and Goal Physique,
        Respectively!
      </div>

      <div className="flex-1 w-full bg-gray-900 p-4 flex flex-col items-end">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className="pl-4 pt-2 pb-2 bg-black chat-bubble mb-2 self-end"
          >
            <p className="text-white">{message.text}</p>
          </div>
        ))}
        {filteredMessages.length === 0 && (
          <p className="text-white text-center">No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
