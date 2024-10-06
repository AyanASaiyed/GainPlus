import React, { useEffect, useState } from "react";
import Message from "./Message";
import Messages from "./Messages";
import { imageDb } from "../../firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
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
      // // flexDirection:"row",
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
  };

  const [yourImage, setYourImage] = useState();
  const [desiredImage, setDesiredImage] = useState();
  const [yourImageFile, setYourImageFile] = useState();
  const [desiredImageFile, setDesiredImageFile] = useState();
  const [confirm, setConfirm] = useState(false);
  // function handleYourImage(e) {
  //   console.log(e.target.files);
  //   setYourImage(URL.createObjectURL(e.target.files[0]));
  // }
  // function handleDesiredImage(e) {
  //   console.log(e.target.files);
  //   setDesiredImage(URL.createObjectURL(e.target.files[0]));
  // }

  useEffect(() => {
    const imageFetching = async () => {
      try {
        const yourImageRef = ref(imageDb, "yourImage");
        const yourImageList= await listAll(yourImageRef);
        if(yourImageList.items.length>0){
        const yourImageFound = await getDownloadURL(yourImageList.items[0]);
        setYourImage(yourImageFound);
        }

        const desiredImageRef = ref(imageDb, "desiredImage");
        const desiredImageList= await listAll(desiredImageRef);
        if(desiredImageList.items.length>0){
        const desiredImageFound = await getDownloadURL( desiredImageList.items[0]);
        setDesiredImage(desiredImageFound);
        }

        if(yourImageList.items.length>0 && desiredImageList.items.length>0)
          {
            setConfirm(true);

          }
      } catch (error) {
        console.log("errror");
      }
    };

    imageFetching();
  },[]);

  const handleConfirm = async () => {
    setConfirm(true);
    if (yourImageFile) {
      const yourImageRef = ref(
        imageDb,
        `yourImage/${yourImageFile.name + v4()}`
      );
      await uploadBytes(yourImageRef, yourImageFile);
      const yourImageURL = await getDownloadURL(yourImageRef);
      setYourImage(yourImageURL);
    }
    if (desiredImageFile) {
      const desiredImageRef = ref(
        imageDb,
        `desiredImage/${desiredImageFile.name + v4()}`
      );
      await uploadBytes(desiredImageRef, desiredImageFile);
      const desiredImageURL = await getDownloadURL(desiredImageRef);
      setDesiredImage(desiredImageURL);
    }

    //  uploadBytes(imgRef, yourImage)
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
                  <input
                    type="file"
                    onChange={(e) => setYourImageFile(e.target.files[0])}
                  ></input>
                </div>
              </>
            ) : (
              <>
                <div style={styles.uploadedImageContainer}>
                  <img style={styles.image} src={yourImage} />
                  {!confirm && (
                    <>
                      <h2>Re-upload Your Photo</h2>
                      <input
                        type="file"
                        onChange={(e) => setYourImageFile(e.target.files[0])}
                      ></input>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <div style={styles.imageStyle}>
            {!desiredImage ? (
              <>
                <div style={styles.newImageUpload}>
                  <h2 style={styles.imageLabel}>Desired Photo</h2>
                  <input
                    type="file"
                    onChange={(e) => setDesiredImageFile(e.target.files[0])}
                  ></input>
                </div>
              </>
            ) : (
              <>
                <div style={styles.uploadedImageContainer}>
                  <img style={styles.image} src={desiredImage} />
                  {!confirm && (
                    <>
                      <h2>Re-upload desired Photo</h2>
                      <input
                        type="file"
                        onChange={(e) => setDesiredImageFile(e.target.files[0])}
                      ></input>
                    </>
                  )}
                </div>
              </>
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
      <Messages />
    </div>
  );
};

export default MessageContainer;
