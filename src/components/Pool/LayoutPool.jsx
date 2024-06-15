/* eslint-disable no-unused-vars */
import React from "react";
import HeaderSwap from "../Swap/HeaderSwap";
import Logic from "../Logic";
import Pool from "./Pool";

const LayoutPool = () => {
  return (
    <div className="flex flex-col h-screen w-full overflow-auto no-scrollbar">
      <HeaderSwap />
      <Pool />
      {/* <Logic /> */}
    </div>
  );
};

export default LayoutPool;
