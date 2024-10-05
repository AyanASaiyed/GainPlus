import React from "react";

const Message = ({ text }) => {
  const styles = {
    container: {
      border: "1px solid black",
      borderRadius: "7px",
      width: "95%",
      marginBottom: "10px",
      padding: "15px",
      boxShadow: "2px 2px 1px 1px black",
    },
    messageContainer: {
      width: "40%",
      textAlign: "justify",
      marginLeft: "auto",
    },
  };

  return (
    <div style={styles.container}>
      <div className="chat chat-end" style={styles.messageContainer}>
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-15 chat-bubble">
          {text}
        </div>
      </div>
    </div>
  );
};

export default Message;
