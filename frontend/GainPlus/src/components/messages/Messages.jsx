import React from "react";
import Message from "./Message";

const Messages = ({ messages }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 w-full overflow-y-scroll">
      {messages.map((message) => (
        <Message key={message.id} text={message.text} />
      ))}
    </div>
  );
};

export default Messages;
