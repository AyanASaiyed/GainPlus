import React from "react";
import { signOut } from "firebase/auth";
import MessageContainer from "../../components/messages/MessageContainer";
import { auth } from "../../firebase/firebase";
import MessageInput from "../../components/messages/MessageInput";

const Home = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out"))
      .catch((error) => console.log(error));
  };

  return (
    <section className="relative h-screen w-screen">
      <div className="flex w-full h-12 bg-red-950 fixed top-0 left-0">
        <h2 className="font-bold text-3xl start-0 pl-3">
          G<span className="text-black">Ai</span>nPlus💪
        </h2>
        <button className="btn end-0 absolute flex hover:bg-red-800" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <MessageContainer />
        <MessageInput/>
      </div>
    </section>
  );
};

export default Home;
