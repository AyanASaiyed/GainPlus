import React from "react";
import useMessagesSent from "../../hooks/useMessagesSent";

const Message = ({ text }) => {
  const { messages, loading } = useMessagesSent();

  const styles = {
    messageContainer: {
      width: "40%",
      textAlign: "justify",
      marginLeft: "auto",
    },
  };

  return (
    <div className="chat chat-end" style={styles.messageContainer}>
      <div className="px-4 flex-1 overflow-auto">
        {messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id}>
              <Message message={message} />
            </div>
          ))}

        {loading && [...Array(3)].map()}

        {!loading && messages.length === 0 && (
          <p className="text-center">
            Begin your conversation by sending a message!
          </p>
        )}
      </div>
    </div>
  );
};
export default Message;
