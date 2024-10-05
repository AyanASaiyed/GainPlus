import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth } from "../../firebase/firebase"; // Import the auth object
import { runModel } from "../roboflow/model";

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
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
    },
    imageContainer: {
      display: "flex",
    },
    uploadedImageContainer:{
      flexDirection:"column",
      justifyContent:"left",
    },
    newImageUpload:{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
    },
    imageLabel:{
      fontSize:"30px",
      marginBottom: "10px",
    },
    imageGroup:{
      display:"flex",
      flexDirection:"column",
      justifyContent:"flex-end",
      //flexDirection:"row",
      alignItems:"flex-end",
    },
    confirmLabel:{
      marginTop:"10px",
      textAlign:"center",
      border:"2px solid white",
      padding:"10px",
      backgroundColor:"green",
      borderRadius:"22px"
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
  const [goal, setGoal] = useState(null);
  const [current, setCurrent] = useState(null);

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
      }
    );

    return () => unsubscribe();
  }, []);

  function handleGoal(e) {
    setGoal(URL.createObjectURL(e.target.files[0]));
  }

  function handleCurrent(e) {
    setCurrent(URL.createObjectURL(e.target.files[0]));
  }

  const filteredMessages = messages.filter((message) => message.text);

  const [yourImage, setYourImage] = useState();
  const [desiredImage, setDesiredImage] = useState();
  const [confirm, setConfirm]= useState(false);
  
  const handleYourImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setYourImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDesiredImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesiredImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = (event) =>{
    setConfirm(true);
    if (yourImage) {
      runModel(yourImage);
    }
    if (desiredImage) {
      runModel(desiredImage);
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto">
      {/* ENTRY MESSAGE HERE */}
      <div className="pl-4 pt-1 pb-6 rounded-lg bg-black chat-bubble chat-start">
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
                <h2 >Change Photo</h2>
                <input type="file" onChange={handleYourImage} style={styles.fileInput}></input>
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
                <h2>Change Photo</h2>
                <input type="file" onChange={handleDesiredImage} style={styles.fileInput}></input>
                </div>
              </>
            )}
          </div>
          
        </div>
        <button title="Submit" style={styles.confirmLabel} onClick={handleConfirm}>Submit Before and After Photos</button>
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
