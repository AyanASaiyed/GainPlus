import React, { useState } from "react";
import Message from "./Message";
import Messages from "./Messages";
import { runModel } from "../roboflow/model";

const MessageContainer = () => {
  const styles = {
    container: {
      height: "100%",
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
  };

  const [yourImage, setYourImage] = useState();
  const [desiredImage, setDesiredImage] = useState();
  const [confirm, setConfirm]= useState(false);
  function handleYourImage(e) {
    console.log(e.target.files);
    setYourImage(URL.createObjectURL(e.target.files[0]));
  };
  function handleDesiredImage(e) {
    console.log(e.target.files);
    setDesiredImage(URL.createObjectURL(e.target.files[0]));
  };
   function handleConfirm(e){
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
    </div>
  );
};

export default MessageContainer;
//<Messages />