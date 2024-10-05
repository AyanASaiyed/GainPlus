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
      {/* Red bar at the top */}
      <div className="fixed w-full h-12 bg-red-950 top-0 left-0 flex items-center justify-between px-4">
        <h2 className="font-bold text-3xl">
          G<span className="text-black">Ai</span>nPlus💪
        </h2>
        <button
          className="btn hover:bg-red-800"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      {/* Main content below the red bar */}
      <div className="flex flex-col items-center justify-center w-full h-full pt-12">
        {/* Add padding-top to prevent content from overlapping with the fixed bar */}
        <MessageContainer />
        <MessageInput />
      </div>
    </section>
  );
};

export default Home;
