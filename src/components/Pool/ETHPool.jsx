/* eslint-disable no-unused-vars */
import React from "react";
import PoolForm from "./PoolFarm";
import { useNavigate } from "react-router-dom";
import { pool_stats } from "../../assets";

const ETHPool = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/Pools");
  };
  return (
    <div className="relative flex flex-col items-center h-full text-white p-6">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#AB6F55] from-5% to-transparent t0-10% blur-[300px]" />
      <div className="absolute inset-0"></div>
      <div className="relative w-full max-w-5xl">
        <div
          onClick={handleGoBack}
          className="text-gray-400 justify-center w-fit mb-2 hover:underline hover:text-white cursor-pointer"
        >
          <span>Go Back</span>
        </div>
        <div className="flex items-center mb-6">
          <div className="relative w-12 h-10">
            <img
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
              className="absolute w-10 h-10 left-0"
            />
            <img
              src="https://icons-ckg.pages.dev/stargate-light/tokens/eth.svg"
              className="absolute w-10 h-10 left-7"
            />
          </div>
          <div className="text-3xl font-extrabold ml-8 block">wBTC/ETH</div>
        </div>
        <hr className="h-px bg-gray-400 opacity-30" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-[1300px]">
          <div className="bg-transparent p-6">
            <div className="flex justify-between mb-4">
              <div className="h-full w-[120px] p-3 border-black border border-opacity-30 rounded-lg shadow-2xl">
                <div className="text-gray-400 text-sm">Liquidity</div>
                <div className="text-lg font-semibold">$54.64M</div>
              </div>
              <div className="h-full w-[120px] p-3 border-black border border-opacity-30 rounded-lg shadow-2xl">
                <div className="text-gray-400 text-sm">Volume (24h)</div>
                <div className="text-lg font-semibold">$163.76k</div>
              </div>
              <div className="h-full w-[120px] p-3 border-black border border-opacity-30 rounded-lg shadow-2xl">
                <div className="text-gray-400 text-sm">Fees (24h)</div>
                <div className="text-lg font-semibold">$1.73k</div>
              </div>
              <div className="h-full w-[120px] p-3 border-black border border-opacity-30 rounded-lg shadow-2xl">
                <div className="text-gray-400 text-sm">APR</div>
                <div className="text-lg font-semibold">27.08%</div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex justify-evenly w-[40%]">
                <div className="flex text-gray-400 mb-2 bg-site-black w-20 justify-center items-center border-[#AB6F55] border border-opacity-50 rounded-lg cursor-pointer">
                  Volume
                </div>
                <div className="text-gray-400 mb-2 cursor-pointer">TVL</div>
                <div className="text-gray-400 mb-2 cursor-pointer">Price</div>
              </div>
              <div className="flex justify-evenly w-[40%]">
                <div className="text-gray-400 mb-2 cursor-pointer">1D</div>
                <div className="text-gray-400 mb-2 cursor-pointer">1W</div>
                <div className="flex selection:text-gray-400 mb-2 bg-site-black w-10 justify-center items-center border-[#AB6F55] border border-opacity-50 rounded-lg  cursor-pointer">
                  1M
                </div>
                <div className="text-gray-400 mb-2 cursor-pointer">1Y</div>
                <div className="text-gray-400 mb-2 cursor-pointer">All</div>
              </div>
            </div>
            <div className="flex flex-col items-start ml-6 mt-2">
              <div className="text-2xl font-semibold mb-3">$58.85k</div>
              <div className="text-sm text-gray-400 mb-6">15 July 2024</div>
            </div>
            <div>
              <img src={pool_stats} alt="Stats" className="w-[100%px]" />
            </div>
          </div>
          {/* <PoolForm /> */}
        </div>
      </div>
    </div>
  );
};

export default ETHPool;
