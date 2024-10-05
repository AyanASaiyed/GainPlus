import React, { useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
const Home = () => {

  return (
    <section className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <h2 className="font-bold text-3xl">G<span className="text-black">Ai</span>nPlus💪</h2>
      <MessageContainer/>
    </section>
  );
};

export default Home;
