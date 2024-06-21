/* eslint-disable no-unused-vars */
import { useChain } from "@cosmos-kit/react";
import { useEffect, useState } from "react";
import { Wallet } from "../wallet/Wallet";
import { goldToken, OmToken, wallet } from "../../assets";
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { coins } from "@cosmjs/stargate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rpc = "https://rpc.hongbai.mantrachain.io";
const fee = {
  add: { amount: coins(2000, "uom"), gas: "3000000" },
  remove: { amount: coins(1000, "uom"), gas: "3000000" },
};

const tokenContractAddress1 =
  "mantra1xursp6m3mftl2e5n7xy6nqg43sxu3s0ta3ryygh6nugxgvttwg8sdj9q44";
const tokenContractAddress2 =
  "mantra1q3ctduh25f5cauakh54xv70ckfug24nuk6wv4wn2f5fusee9tq0swap24j";
const lpPoolAddress =
  "mantra1h6563l6sf5tdp0wxewgayyn2f98g3sq3er5r2ux9gnawhxafcquqmfysza";
const lpToken =
  "mantra1qfkx2fcw2jl46vktc2z70mxaynh43rqwj4wcqjg4c6m8d8nspvtsq72uca";

const PoolForm = () => {
  const [isAdding, setIsAdding] = useState(true);
  const [token1Amount, setToken1Amount] = useState("0");
  const [token2Amount, setToken2Amount] = useState("0");
  const [removeAmount, setRemoveAmount] = useState("0");
  const [removeBalance, setRemoveBalance] = useState(0);
  const [token1_Balance, setToken1_Balance] = useState(0);
  const [token2_Balance, setToken2_Balance] = useState(0);

  const { isWalletConnected, getOfflineSigner, address } =
    useChain("mantrachaintestnet");

  const notify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

  useEffect(() => {
    const QueryBalance = async () => {
      try {
        const client = await CosmWasmClient.connect(rpc);
        const response = await client.queryContractSmart(lpToken, {
          balance: { address: address },
        });
        const parseBalance = parseInt(response.balance);
        const finalBalance = parseBalance / 1000000;
        setRemoveBalance(finalBalance);
      } catch (error) {
        console.error("Error querying contract:", error);
      }
    };
    QueryBalance();
  }, [address]);

  useEffect(() => {
    const QueryBalance = async () => {
      try {
        const client = await CosmWasmClient.connect(rpc);
        const response1 = await client.queryContractSmart(
          tokenContractAddress1,
          {
            balance: { address: address },
          }
        );
        const response2 = await client.queryContractSmart(
          tokenContractAddress2,
          {
            balance: { address: address },
          }
        );
        const parseBalance1 = parseInt(response1.balance);
        const finalBalance1 = parseBalance1 / 1000000;
        const parseBalance2 = parseInt(response2.balance);
        const finalBalance2 = parseBalance2 / 1000000;
        setToken1_Balance(finalBalance1);
        setToken2_Balance(finalBalance2);
      } catch (error) {
        console.error("Error querying contract:", error);
      }
    };
    QueryBalance();
  }, [address]);

  const executeTransaction = async (
    contractAddress,
    msg,
    msgToast,
    feeType
  ) => {
    const offlineSigner = getOfflineSigner();
    const client = await SigningCosmWasmClient.connectWithSigner(
      rpc,
      offlineSigner
    );
    const result = await client.execute(
      address,
      contractAddress,
      msg,
      fee[feeType]
    );
    console.log("Transaction result:", result);
    notify(msgToast);
  };

  const addLiquidity = async () => {
    const addLiquidityMsg = {
      add_liquidity: {
        token1_amount: token1Amount,
        min_liquidity: "0",
        max_token2: token2Amount,
      },
    };
    await executeTransaction(
      lpPoolAddress,
      addLiquidityMsg,
      "Liquidity added successfully!",
      "add"
    );
  };

  const withdrawLiquidity = async () => {
    const removeMsg = {
      remove_liquidity: {
        amount: removeAmount,
        min_token1: "0",
        min_token2: "0",
      },
    };
    await executeTransaction(
      lpPoolAddress,
      removeMsg,
      "Liquidity removed successfully!",
      "remove"
    );
  };

  const increaseAllowance = async (contractAddress, amount) => {
    const increaseAllowanceMsg = {
      increase_allowance: {
        spender: lpPoolAddress,
        amount,
      },
    };
    await executeTransaction(
      contractAddress,
      increaseAllowanceMsg,
      "Allowance increased successfully!",
      "add"
    );
  };

  const handleAddLiquidity = async () => {
    await increaseAllowance(tokenContractAddress1, token1Amount);
    await increaseAllowance(tokenContractAddress2, token2Amount);
    await addLiquidity();
  };

  const handleRemoveLiquidity = async () => {
    await increaseAllowance(lpToken, removeAmount);
    await withdrawLiquidity();
  };

  return (
    <div className="flex">
      <ToastContainer />
      <hr className="h-[600px] w-0.25 bg-gray-400 rotate-180 opacity-30" />
      <div>
        <div className="flex justify-between items-center p-1 bg-transparent border-[#AB6F55] border-2 w-40 mt-10 ml-5 rounded-lg h-10">
          <div
            className={`flex cursor-pointer font-bold font-Poppins rounded-md w-12 h-full justify-center items-center ${
              isAdding ? "bg-[#AB6F55]" : ""
            }`}
            onClick={() => setIsAdding(true)}
          >
            Add
          </div>
          <div
            className={`flex cursor-pointer font-bold font-Poppins rounded-md h-full w-20 justify-center items-center ${
              !isAdding ? "bg-[#AB6F55]" : ""
            }`}
            onClick={() => setIsAdding(false)}
          >
            Remove
          </div>
        </div>
        {isAdding ? (
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col bg-site-black bg-opacity-80 border-[#AB6F55] border-2 border-opacity-80 shadow-xl w-[400px] h-28 mt-10 ml-10 rounded-lg">
              <div className="flex justify-between w-full p-2">
                <input
                  type="number"
                  placeholder="0"
                  className="text-3xl font-extrabold block w-[100%] h-full bg-transparent outline-none"
                  onChange={(e) => setToken1Amount(e.target.value)}
                />
                <div className="flex border-[#AB6F55] border-2 h-12 w-32 p-1 justify-between items-center font-bold rounded-lg border-opacity-40">
                  <img src={OmToken} className="w-7" alt="OM" />
                  OM
                </div>
              </div>
              <div className="flex justify-between p-2">
                <div>$0.00</div>
                <div className="flex justify-between w-[120px]">
                  <img src={wallet} className="w-5" alt="Wallet" />
                  <span>{token1_Balance ? token1_Balance : "0.00"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-site-black bg-opacity-80 border-[#AB6F55] border-2 border-opacity-80 shadow-xl w-[400px] h-28 ml-10 mt-10 rounded-lg">
              <div className="flex justify-between w-full p-2">
                <input
                  type="number"
                  placeholder="0"
                  className="text-3xl font-extrabold block w-[100%] h-full bg-transparent outline-none"
                  onChange={(e) => setToken2Amount(e.target.value)}
                />
                <div className="flex border-[#AB6F55] border-2 h-12 w-32 p-1 justify-between items-center font-bold rounded-lg border-opacity-40">
                  <img src={goldToken} className="w-7" alt="GOLD" />
                  GOLD
                </div>
              </div>
              <div className="flex justify-between p-2">
                <div>$0.00</div>
                <div className="flex justify-between w-[120px]">
                  <img src={wallet} className="w-5" alt="Wallet" />
                  <span>{token2_Balance ? token2_Balance : "0.00"}</span>
                </div>
              </div>
            </div>
            {isWalletConnected ? (
              <div
                className="flex items-center justify-center bg-[#AB6F55] mt-5 w-[200px] p-1 h-14 ml-40 rounded-md font-bold cursor-pointer"
                onClick={handleAddLiquidity}
              >
                Add Liquidity
              </div>
            ) : (
              <div className="flex justify-center items-center mt-10 ml-10">
                <Wallet />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col bg-site-black bg-opacity-80 border-[#AB6F55] border-2 border-opacity-80 shadow-xl w-[400px] h-28 mt-10 ml-10 rounded-lg">
              <div className="flex justify-between w-full p-2">
                <input
                  type="number"
                  placeholder="0"
                  className="text-3xl font-extrabold block w-[100%] h-full bg-transparent outline-none"
                  onChange={(e) => setRemoveAmount(e.target.value)}
                />
                <div className="flex border-[#AB6F55] border-2 h-12 w-32 p-1 justify-between items-center font-bold rounded-lg border-opacity-40">
                  <img src={OmToken} className="w-7" alt="OM" />
                  OM
                </div>
              </div>
              <div className="flex justify-between p-2">
                <div>$0.00</div>
                <div className="flex justify-between w-[120px]">
                  <img src={wallet} className="w-5" alt="Wallet" />
                  <span>{removeBalance ? removeBalance : "0.00"}</span>
                </div>
              </div>
            </div>
            {isWalletConnected ? (
              <div
                className="flex items-center justify-center bg-[#AB6F55] mt-5 w-[200px] p-1 h-14 ml-40 rounded-md font-bold cursor-pointer"
                onClick={handleRemoveLiquidity}
              >
                Remove Liquidity
              </div>
            ) : (
              <div className="flex justify-center items-center mt-10 ml-10">
                <Wallet />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolForm;
