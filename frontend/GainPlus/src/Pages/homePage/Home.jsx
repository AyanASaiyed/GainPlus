import React from "react";
import { signOut } from "firebase/auth";
import MessageContainer from "../../components/messages/MessageContainer";
import { auth } from "../../firebase/firebase";
const Home = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out"))
      .catch((error) => console.log(error));
  };

  return (
    <section className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <h2 className="font-bold text-3xl">
        G<span className="text-black">Ai</span>nPlus💪
      </h2>
      <MessageContainer />
      <button className="btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </section>
  );
};

export default Home;
