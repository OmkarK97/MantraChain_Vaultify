/* eslint-disable no-unused-vars */
import React from "react";
import { WavyBackground } from "../ui/wavy-background";

const Pool = () => {
  return (
    <div className="flex flex-col p-10 px-15 justify-center">
      <div className="pink_gradient" />
      <h1 className="text-white font-poppins font-black text-5xl tracking-wide">
        Liquidity Pools
      </h1>
      <p className="text-dim-white font-poppins font-medium mt-3 text-base">
        Add liquidity to Stargate&apos;s omnichain protocol and earn stablecoin
        rewards on every Stargate transfer. Liquidity providers can also farm
        their LP tokens to receive STG token rewards.
      </p>
      <div className="blue_gradient" />
    </div>
  );
};

export default Pool;
