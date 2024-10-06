import React, { useState } from "react";
import Message from "./Message";
import Messages from "./Messages";
import { imageDb } from "../../firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import MessageInput from "./MessageInput";
import { auth, db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { runModel } from "../roboflow/model";

const MessageContainer = () => {
  const styles = {
    container: {
      height: "80%",
    },
    image: {
      width: "300px",
      height: "250px",
    },
    imageStyle: {
      border: "1px solid white",
      width: "350px",
      height: "350px",
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
      // // flexDirection:"row",
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
        if (
          yourImageList.items.length > 0 &&
          desiredImageList.items.length > 0
        ) {
          setConfirm(true);
        }

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
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };

    imageFetching();
  }, []);

  // Handle image confirmation and upload
  const handleConfirm = async () => {
    setConfirm(true);
    if (yourImage) {
      runModel(yourImage);
    }
    if (desiredImage) {
      runModel(desiredImage);
    }
  };

  return (
    <div
      className="border-r border-t border-l text-md rounded-t-lg w-full p-4 bg-gray-900 text-white"
      style={styles.container}
    >
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
                <h2 >Re-upload Your Photo</h2>
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
        <button title="Submit" style={styles.confirmLabel} onClick={handleConfirm}>Confirm</button>
      </div>
      <Messages />
    </div>
  );
};

export default MessageContainer;
