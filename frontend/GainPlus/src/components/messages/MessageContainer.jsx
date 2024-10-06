import React, { useEffect, useState } from "react";
import Message from "./Message";
import Messages from "./Messages";
import { imageDb } from "../../firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
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

  const [yourImage, setYourImage] = useState();
  const [desiredImage, setDesiredImage] = useState();
  const [yourImageFile, setYourImageFile] = useState();
  const [desiredImageFile, setDesiredImageFile] = useState();
  const [confirm, setConfirm] = useState(false);
  const [messages, setMessages] = useState([]);

  // Fetch images from Firebase on component mount
  useEffect(() => {
    const imageFetching = async () => {
      try {
        const yourImageRef = ref(imageDb, "yourImage");
        const yourImageList = await listAll(yourImageRef);
        if (yourImageList.items.length > 0) {
          const yourImageFound = await getDownloadURL(yourImageList.items[0]);
          setYourImage(yourImageFound);
        }

        const desiredImageRef = ref(imageDb, "desiredImage");
        const desiredImageList = await listAll(desiredImageRef);
        if (desiredImageList.items.length > 0) {
          const desiredImageFound = await getDownloadURL(
            desiredImageList.items[0]
          );
          setDesiredImage(desiredImageFound);
        }

        if (
          yourImageList.items.length > 0 &&
          desiredImageList.items.length > 0
        ) {
          setConfirm(true);
        }
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };

    imageFetching();
  }, []);

  // Handle image confirmation and upload
  const handleConfirm = async () => {
    setConfirm(true);
    if (yourImageFile) {
      const yourImageRef = ref(
        imageDb,
        `${auth.currentUser.uid}/yourImage/${yourImageFile.name + v4()}`
      );
      await uploadBytes(yourImageRef, yourImageFile);
      const yourImageURL = await getDownloadURL(yourImageRef);
      setYourImage(yourImageURL);
    }
    if (desiredImageFile) {
      const desiredImageRef = ref(
        imageDb,
        `${auth.currentUser.uid}/desiredImage/${desiredImageFile.name + v4()}`
      );
      await uploadBytes(desiredImageRef, desiredImageFile);
      const desiredImageURL = await getDownloadURL(desiredImageRef);
      setDesiredImage(desiredImageURL);
    }
  };

  // Save message to Firestore
  const saveMessageToFirestore = async (messageText) => {
    try {
      const authUser = auth.currentUser;

      if (authUser) {
        const docRef = await addDoc(collection(db, "messages"), {
          message: messageText,
          senderID: authUser.uid,
          time: new Date(),
        });
        console.log("Message saved to Firestore");
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.log("Error saving message:", error.message);
    }
  };

  // Send a new message
  const sendMessage = async (messageText) => {
    const newMessage = { text: messageText };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    await saveMessageToFirestore(messageText);
  };

  return (
    <div
      className="border text-md rounded-t-lg w-full p-4 bg-gray-900 text-white"
      style={styles.container}
    >
      <div style={styles.imageGroup}>
        <div style={styles.imageContainer}>
          <div style={styles.imageStyle}>
            {!yourImage ? (
              <div style={styles.newImageUpload}>
                <h2 style={styles.imageLabel}>Your Photo</h2>
                <input
                  type="file"
                  onChange={(e) => setYourImageFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div style={styles.uploadedImageContainer}>
                <img style={styles.image} src={yourImage} alt="Your Image" />
                {!confirm && (
                  <div>
                    <h2>Re-upload Your Photo</h2>
                    <input
                      type="file"
                      onChange={(e) => setYourImageFile(e.target.files[0])}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div style={styles.imageStyle}>
            {!desiredImage ? (
              <div style={styles.newImageUpload}>
                <h2 style={styles.imageLabel}>Desired Photo</h2>
                <input
                  type="file"
                  onChange={(e) => setDesiredImageFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div style={styles.uploadedImageContainer}>
                <img
                  style={styles.image}
                  src={desiredImage}
                  alt="Desired Image"
                />
                {!confirm && (
                  <div>
                    <h2>Re-upload Desired Photo</h2>
                    <input
                      type="file"
                      onChange={(e) => setDesiredImageFile(e.target.files[0])}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {!confirm && (
          <button
            title="Submit"
            style={styles.confirmLabel}
            onClick={handleConfirm}
          >
            Confirm
          </button>
        )}
      </div>

      <div style={styles.messagesContainer}>
        <Messages messages={messages} />
      </div>

      <div style={styles.inputContainer}>
        <MessageInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default MessageContainer;
