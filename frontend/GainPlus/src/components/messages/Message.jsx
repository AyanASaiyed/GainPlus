import React from "react";

const Message = ({ text }) => {
  const styles = {
    messageContainer: {
      width: "40%",
      textAlign: "justify",
      marginLeft: "auto",
    },
  };

  return (
    <div className="chat chat-end" style={styles.messageContainer}>
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-15 chat-bubble">
        Your Message
      </div>
    </div>
  );
};
export default Message;
