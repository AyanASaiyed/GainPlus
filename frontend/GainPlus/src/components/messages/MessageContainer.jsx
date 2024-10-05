import React, { useState } from "react";
import Messages from "../../components/messages/Messages";
import MessageInput from "../../components/messages/MessageInput";

const MessageContainer = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (messageText) => {
    const newMessage = { text: messageText, id: Date.now() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="mt-10 border rounded-lg w-full h-4/5 bg-black p-4 shadow-md">
      <Messages messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default MessageContainer;
