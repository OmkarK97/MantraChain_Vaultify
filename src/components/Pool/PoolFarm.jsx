/* eslint-disable no-unused-vars */
import { useChain } from "@cosmos-kit/react";
import { useState } from "react";
import { Wallet } from "../wallet/Wallet";

const PoolForm = () => {
  const [amount, setAmount] = useState({ wbtc: 0, eth: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAmount({ ...amount, [name]: value });
  };

  const { isWalletConnected } = useChain("mantrachaintestnet");

  return (
    <div className=" p-6">
      <div className="flex justify-between mb-6">
        <button className="bg-gray-700 text-white px-4 py-2 rounded">
          Add
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded">
          Remove
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <input
            type="number"
            name="wbtc"
            value={amount.wbtc}
            onChange={handleInputChange}
            className="bg-gray-700 p-2 rounded text-white flex-1"
          />
          <div className="text-lg font-bold mx-2">wBTC</div>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="number"
            name="eth"
            value={amount.eth}
            onChange={handleInputChange}
            className="bg-gray-700 p-2 rounded text-white flex-1"
          />
          <div className="text-lg font-bold mx-2">ETH</div>
        </div>
      </div>
      {isWalletConnected ? (
        <button className="bg-yellow-600 text-white w-full py-2 mt-6 rounded">
          Enter Amount
        </button>
      ) : (
        <div className=" w-full py-2 mt-6 rounded flex justify-center">
          <Wallet />
        </div>
      )}
    </div>
  );
};

export default PoolForm;
