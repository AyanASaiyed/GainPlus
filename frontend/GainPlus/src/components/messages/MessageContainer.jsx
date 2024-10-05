import React from "react";
import Message from "./Message";
import Messages from "./Messages";

const MessageContainer = () => {
  const styles={
    container:{
      // border:" 1px solid black",
      // borderRadius:"7px",
      // width:"95%",
      height:"80%",
      // marginBottom:"1px",
      // padding:"15px",
      // boxShadow:"2px 2px 1px 1px black",
      // backgroundColor:"black",
    }, 
  };
  return (
    <div className="border text-md rounded-lg w-full p-4 bg-gray-900 text-white" style={styles.container}>
      
      <Messages />
    </div>
  );
};

export default MessageContainer;
