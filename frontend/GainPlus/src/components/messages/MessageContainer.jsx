import React, { useState } from "react";
import Message from "./Message";
import Messages from "./Messages";
import { runModel } from "../roboflow/model";
import MessageInput from "./MessageInput";
import { auth, db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const MessageContainer = () => {
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
      alignItems: "flex-end",
    },
    confirmLabel: {
      marginTop: "10px",
      textAlign: "center",
      border: "2px solid white",
      padding: "10px",
      backgroundColor: "green",
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

  const saveMessageToFirestore = async (messageText) => {
    try {
      const authUser = auth.currentUser;

      if (authUser) {
        const docRef = await addDoc(collection(db, "messages"), {
          message: messageText,
          senderID: authUser.uid,
          time: new Date(),
        });
        console.log("Messaged saved on Firestore");
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.log("error: " + error.message);
    }
  };

  const sendMessage = async (messageText) => {
    const newMessage = { text: messageText };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    await saveMessageToFirestore(messageText);
  };

  return (
    <div
      className="border text-md rounded-t-lg w-full overflow-y-scroll p-4 bg-gray-900 text-white"
      style={styles.container}
    >
      <div className="pl-4 pt-6 pb-6 rounded-lg bg-black chat-bubble chat-start text-white">
        Please Enter Images of your Goal and Current Physique!
      </div>
      <div style={styles.imageGroup}>
        <div style={styles.imageContainer}>
          <div style={styles.imageStyle}>
            {!yourImage ? (
              <>
                <div style={styles.newImageUpload}>
                  <h2 style={styles.imageLabel}>Your Photo</h2>
                  <input type="file" onChange={handleYourImage}></input>
                </div>
              </>
            ) : (
              <>
                <div style={styles.uploadedImageContainer}>
                  <img style={styles.image} src={yourImage} />
                  <h2>Re-upload Your Photo</h2>
                  <input type="file" onChange={handleYourImage}></input>
                </div>
              </>
            )}
          </div>
          <div style={styles.imageStyle}>
            {!desiredImage ? (
              <>
                <div style={styles.newImageUpload}>
                  <h2 style={styles.imageLabel}>Desired Photo</h2>
                  <input type="file" onChange={handleDesiredImage}></input>
                </div>
              </>
            ) : (
              <>
                <div style={styles.uploadedImageContainer}>
                  <img style={styles.image} src={desiredImage} />
                  <h2>Re-upload desired Photo</h2>
                  <input type="file" onChange={handleDesiredImage}></input>
                </div>
              </>
            )}
          </div>
        </div>
        <button
          title="Submit"
          style={styles.confirmLabel}
          onClick={handleConfirm}
        >
          Confirm
        </button>
        {/* Display the messages */}
        <Messages />
      </div>
    </div>
  );
};

export default MessageContainer;
//<Messages />