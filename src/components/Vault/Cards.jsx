/* eslint-disable no-unused-vars */
import React from "react";

const Cards = ({ id, title, percentage, time }) => {
  return (
    <div className="w-full h-full p-4">
      <div className="flex flex-col border-site-black border-2 rounded-xl w-30 h-40">
        <div className="flex justify-start text-lg font-medium m-5">
          {title}
        </div>
        <div className="flex justify-start items-end m-5">
          <div className="text-2xl font-semibold">{percentage}</div>
          <div className="text-lg font-medium ml-3 text-gray-400">{time}</div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
