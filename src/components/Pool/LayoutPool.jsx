/* eslint-disable no-unused-vars */
import React from "react";
import HeaderSwap from "../Swap/HeaderSwap";
import Logic from "../Logic";
import Pool from "./Pool";

const LayoutPool = () => {
  return (
    <div>
      <HeaderSwap />
      <Pool />
      {/* <Logic /> */}
    </div>
  );
};

export default LayoutPool;
