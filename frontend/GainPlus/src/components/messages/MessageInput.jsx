import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const MessageInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <form className="px-4 my-3 w-1/2" onSubmit={handleSubmit}>
      <div className="w-full relative flex items-center justify-center">
        <button
          type="submit"
          className="pl-4 absolute start-0 flex items-center pe-3"
        >
          <i className="bi bi-mic-fill"></i>
        </button>
        <input
          type="text"
          className="pl-10 start-2 border text-md rounded-lg block w-full p-7 bg-gray-900 text-white"
          placeholder="Enter Message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
