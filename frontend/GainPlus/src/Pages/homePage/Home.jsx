import React, { useState } from "react";
import { signOut } from "firebase/auth";
import MessageContainer from "../../components/messages/MessageContainer";
import MessageInput from "../../components/messages/MessageInput";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";

const Home = () => {
  const [messages, setMessages] = useState([]);

  const saveMessageToFirestore = async (messageText) => {
    try {
      const authUser = auth.currentUser;

      if (authUser) {
        const docRef = await addDoc(collection(db, "messages"), {
          message: messageText,
          senderID: authUser.uid,
          time: new Date(),
        });
        console.log("Messaged saved on Firestore");
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.log("error: " + error.message);
    }
  };

  const sendMessage = async (messageText) => {
    const newMessage = { text: messageText };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    await saveMessageToFirestore(messageText);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out"))
      .catch((error) => console.log(error));
  };

  return (
    <section className="h-full w-full flex-col overflow-hidden">
      <div className="fixed w-full h-20 mb-20 bg-red-950 top-0 left-0 flex items-center justify-between z-10">
        <img src="./drawing.png" className="h-16 w-40" alt="logo" />
        <button className="btn hover:bg-red-800" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <div className="flex flex-col items-center justify-end h-screen pb-20">
          <MessageContainer messages={messages} />
          <MessageInput onSendMessage={sendMessage} />
      </div>
    </section>
  );
};

export default Home;
