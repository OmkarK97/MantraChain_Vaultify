/* eslint-disable no-unused-vars */
import React from "react";
import PoolForm from "./PoolFarm";
import { useNavigate } from "react-router-dom";
import { pool_stats, goldToken, OmToken } from "../../assets";

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
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/4114.png"
              className="absolute w-10 h-10 left-0"
              alt="gold token"
            />
            <img
              src={OmToken}
              className="absolute w-10 h-10 left-7"
              alt="om token"
            />
          </div>
          <div className="text-3xl font-extrabold ml-8 block">Gold/OM</div>
        </div>
        <hr className="h-px bg-gray-400 opacity-30 w-[110%]" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-[1300px]">
          <div className="bg-transparent p-6">
            <div className="flex justify-between mb-4">
              <div className="h-full w-[130px] p-3 bg-site-black bg-opacity-50 border-[#AB6F55] border-2 border-opacity-40 rounded-lg shadow-2xl">
                <div className="text-gray-400 text-sm">Liquidity</div>
                <div className="text-lg font-semibold">$54.64M</div>
              </div>
              <div className="h-full w-[130px] p-3 bg-site-black bg-opacity-50 border-[#AB6F55] border-2 border-opacity-40 rounded-lg shadow-2xl">
                <div className="text-gray-400 text-sm">Volume (24h)</div>
                <div className="text-lg font-semibold">$163.76k</div>
              </div>
              <div className="h-full w-[130px] p-3 bg-site-black bg-opacity-50 border-[#AB6F55] border-2 border-opacity-40 rounded-lg shadow-2xl">
                <div className="text-gray-400 text-sm">Fees (24h)</div>
                <div className="text-lg font-semibold">$1.73k</div>
              </div>
              <div className="h-full w-[130px] p-3 bg-site-black bg-opacity-50 border-[#AB6F55] border-2 border-opacity-40 rounded-lg shadow-2xl">
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
            <div className="flex flex-col h-20 w-full p-3 bg-site-black bg-opacity-10  border-[#AB6F55] border-2 border-opacity-10 rounded-lg shadow-2xl">
              <div className="flex justify-between w-full items-start pl-10">
                <span className="flex items-start w-[30%]">Token:</span>
                <span className="flex items-start w-[30%]">Reward APR:</span>
                <span className="flex items-start w-[30%]">Amount:</span>
              </div>
              <div className="flex justify-between w-full items-start pl-10">
                <div className="flex justify-between w-[30%]">
                  <img src={OmToken} className="w-5" />
                  <span className="flex items-start w-[80%]">OM</span>
                </div>
                <span className="flex items-start w-[30%]">20%</span>
                <span className="flex items-start w-[30%]">20k</span>
              </div>
            </div>
          </div>
          <PoolForm />
        </div>
      </div>
    </div>
  );
};

export default ETHPool;
