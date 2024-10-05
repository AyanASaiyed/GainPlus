import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase"; // Import your Firestore instance
import { collection, addDoc } from "firebase/firestore";
import "bootstrap-icons/font/bootstrap-icons.css";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        senderID: auth.currentUser.uid,
        timestamp: new Date(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <form
      onSubmit={sendMessage}
      style={{ marginTop: "4px", marginBottom: "0px" }}
      className="px-4 w-full flex justify-center"
    >
      <div className="relative w-1/2">
        <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
          <i className="bi bi-chat-right-text-fill"></i>
        </span>
        <input
          type="text"
          className="pl-10 pr-4 border rounded-lg block w-full p-4 bg-gray-900 text-white"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-white"
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
