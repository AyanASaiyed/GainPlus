import React, { useState } from "react";
import { signOut } from "firebase/auth";
import MessageContainer from "../../components/messages/MessageContainer";
import MessageInput from "../../components/messages/MessageInput";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";

const Home = () => {

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out"))
      .catch((error) => console.log(error));
  };

  return (
    <section className="h-screen w-screen fixed">
      <div className="fixed w-full h-20 bg-transparent top-0 left-0 flex items-center justify-between px-4">
        <img src="./drawing.png" className="h-16 w-44"></img>
        <button className="btn mt-4 hover:bg-red-800" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full rounded-sm">
        <MessageContainer />{" "}
      </div>
    </section>
  );
};

export default Home;
