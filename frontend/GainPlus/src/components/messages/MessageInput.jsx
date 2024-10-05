import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const MessageInput = () => {
  return (
    <form className="w-full">
      {" "}
      {/* Changed to w-full */}
      <div className="relative flex items-center justify-center w-full">
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
