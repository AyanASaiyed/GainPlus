import React from "react";
import Message from "./Message";

const Messages = ({ messages }) => {
  return (
    <div className="flex flex-col items-center justify-center overflow-scroll">
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
