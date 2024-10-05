import React, { useState } from "react";

const Messages = ({ messages }) => {
  const [goal, setGoal] = useState(null);
  const [current, setCurrent] = useState(null);

  function handleGoal(e) {
    setGoal(URL.createObjectURL(e.target.files[0]));
  }

  function handleCurrent(e) {
    setCurrent(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="flex flex-col overflow-y-scroll chat chat-start">

      <div className="pl-4 pt-6 pb-6 rounded-lg bg-black chat-bubble">
        Please Enter Images of your Goal and Current Physique!
      </div>

      <div className="flex flex-col items-end w-full">
        <div className="pl-4 pt-2 pb-2 ml-auto">
          <label className="block text-white mb-2">Goal Physique</label>
          <input
            type="file"
            className="block text-white bg-black"
            onChange={handleGoal}
          />
          {goal && <img src={goal} alt="Goal Physique" className="mt-2" />}
        </div>

        <div className="pl-4 pt-2 pb-2 ml-auto">
          <label className="block text-white mb-2">Current Physique</label>
          <input
            type="file"
            className="block text-white bg-black"
            onChange={handleCurrent}
          />
          {current && <img src={current} alt="Current Physique" className="mt-2" />}
        </div>
      </div>
    </div>
  );
};

export default Messages;
