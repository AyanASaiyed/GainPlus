import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const MessageInput = () => {
  return (
    <form className="px-4 my-3 w-1/2">
      <div className="w-full relative flex items-center justify-center">
        <button
          type="submit"
          className="pl-4 absolute start-0 flex items-center pe-3"
        >
          <i class="bi bi-mic-fill"></i>
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
          <i class="bi bi-send-fill"></i>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
