import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth } from "../../firebase/firebase"; // Import the auth object

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [goal, setGoal] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "messages"),
        where("senderID", "==", auth.currentUser.uid)
      ),
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedMessages);
        setMessages(fetchedMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  function handleGoal(e) {
    setGoal(URL.createObjectURL(e.target.files[0]));
  }

  function handleCurrent(e) {
    setCurrent(URL.createObjectURL(e.target.files[0]));
  }

  const filteredMessages = messages.filter((message) => message.text);

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto">
      {/* ENTRY MESSAGE HERE */}
      <div className="pl-4 pt-1 pb-6 rounded-lg bg-black chat-bubble chat-start">
        Please Enter Images of your Goal and Current Physique!
      </div>

      <div className="flex-1 w-full bg-gray-900 p-4 flex flex-col items-end">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className="pl-4 pt-2 pb-2 bg-black chat-bubble mb-2 self-end"
          >
            <p className="text-white">{message.text}</p>
          </div>
        ))}
        {filteredMessages.length === 0 && (
          <p className="text-white text-center">No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
