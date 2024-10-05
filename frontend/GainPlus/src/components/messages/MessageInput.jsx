import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase"; // Import your Firestore instance
import { collection, addDoc } from "firebase/firestore";

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
    <form onSubmit={sendMessage} className="px-4 my-3 w-full">
      <div className="w-full relative flex items-center justify-center">
        <input
          type="text"
          className="start-2 border text-md rounded-lg block w-full p-4 bg-gray-900 text-white"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
