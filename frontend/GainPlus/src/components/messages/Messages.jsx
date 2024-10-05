import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 w-full overflow-y-scroll">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
