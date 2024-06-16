// /* eslint-disable no-unused-vars */
// import { useChain } from "@cosmos-kit/react";
// import { useState } from "react";
// import { Wallet } from "../wallet/Wallet";
// import { wallet } from "../../assets";
// import {
//   CosmWasmClient,
//   SigningCosmWasmClient,
// } from "@cosmjs/cosmwasm-stargate";
// import { coins } from "@cosmjs/stargate";

// const rpc = "https://rpc.hongbai.mantrachain.io";

// const tokenContractAddress1 =
//   "mantra1mv4f3tne3wsrvu703gkggz8m7cjuce7lgfxhhv90r7syfyg2hgssuc8hup";

// const tokenContractAddress2 =
//   "mantra1lezfs900eury8mtlncx3mqmtnx674hueteafs7ulzty9s4ftz6nsl3tswt";

// const lpPoolAddress =
//   "mantra1azschuzgy8vqjsxznj6mc5wyw0046m0avc8ea40hslmwgp0v286sgvqtr3";

// const lpToken =
//   "mantra1wrld45kthrhq8wz5us0jjmxwp4q90unc0l4pu2n9dl7tf6xqm3aq8342ll";

// const PoolForm = () => {
//   const [amount, setAmount] = useState({ wbtc: 0, eth: 0 });
//   const [add, setAdd] = useState(true);
//   const [remove, setRemove] = useState(false);
//   const [token1_amount, setToken1_amount] = useState("0");
//   const [token2_amount, setToken2_amount] = useState("0");
//   const [removeAmount, setRemoveAmount] = useState("0");

//   const { isWalletConnected, getOfflineSigner, address } =
//     useChain("mantrachaintestnet");

//   const AddLiquidity = async () => {
//     const offlineSigner = getOfflineSigner();
//     const client = await SigningCosmWasmClient.connectWithSigner(
//       rpc,
//       offlineSigner
//     );

//     // const depositAmount = "500000"; // Assuming '500000' is the desired deposit amount

//     // Construct the increase allowance message
//     const increaseAllowanceMsg = {
//       add_liquidity: {
//         token1_amount: token1_amount,
//         min_liquidity: "0",
//         max_token2: token2_amount,
//       },
//     };

//     // Prepare the fee
//     const fee = {
//       amount: coins(2000, "uom"), // Adjust the fee according to your chain
//       gas: "3000000",
//     };

//     // Execute the increase allowance transaction
//     const result = await client.execute(
//       address,
//       lpPoolAddress,
//       increaseAllowanceMsg,
//       fee
//     );

//     // Log the transaction result
//     console.log("Transaction result:", result);
//   };

//   const queryCounter = async () => {
//     try {
//       const client = await CosmWasmClient.connect(rpc);
//       const response = await client.queryContractSmart(lpPoolAddress, {
//         info: {},
//       });
//       console.log(response);
//     } catch (error) {
//       console.error("Error querying contract:", error);
//     }
//   };

//   const WithdrawVault = async () => {
//     const offlineSigner = getOfflineSigner();
//     const client = await SigningCosmWasmClient.connectWithSigner(
//       rpc,
//       offlineSigner
//     );

//     // const depositAmount = "500000"; // Assuming '500000' is the desired deposit amount

//     // Construct the increase allowance message
//     const removeMsg = {
//       remove_liquidity: {
//         amount: removeAmount,
//         min_token1: "0",
//         min_token2: "0",
//       },
//     };

//     // Prepare the fee
//     const fee = {
//       amount: coins(1000, "uom"), // Adjust the fee according to your chain
//       gas: "3000000",
//     };

//     // Execute the increase allowance transaction
//     const result = await client.execute(address, lpPoolAddress, removeMsg, fee);

//     // Log the transaction result
//     console.log("Transaction result:", result);
//   };

//   async function AddAllowance1() {
//     // Create a signing client
//     const offlineSigner = getOfflineSigner();
//     const client = await SigningCosmWasmClient.connectWithSigner(
//       rpc,
//       offlineSigner
//     );

//     console.log(client, "SigningCosmWasm");

//     // Construct the increase allowance message
//     const increaseAllowanceMsg = {
//       increase_allowance: {
//         spender: lpPoolAddress,
//         amount: token1_amount,
//       },
//     };

//     const fee = {
//       amount: coins(2000, "uom"), // Adjust the fee according to your chain
//       gas: "200000",
//     };

//     const result = await client.execute(
//       address,
//       tokenContractAddress1,
//       increaseAllowanceMsg,
//       fee
//     );

//     console.log("Transaction result:", result);
//     AddAllowance2();
//   }

//   async function AddAllowance2() {
//     // Create a signing client
//     const offlineSigner = getOfflineSigner();
//     const client = await SigningCosmWasmClient.connectWithSigner(
//       rpc,
//       offlineSigner
//     );

//     console.log(client, "SigningCosmWasm");

//     // Construct the increase allowance message
//     const increaseAllowanceMsg = {
//       increase_allowance: {
//         spender: lpPoolAddress,
//         amount: token2_amount,
//       },
//     };

//     const fee = {
//       amount: coins(2000, "uom"), // Adjust the fee according to your chain
//       gas: "200000",
//     };

//     const result = await client.execute(
//       address,
//       tokenContractAddress2,
//       increaseAllowanceMsg,
//       fee
//     );

//     console.log("Transaction result:", result);
//     AddLiquidity();
//   }

//   async function removeAllownace() {
//     const offlineSigner = getOfflineSigner();
//     const client = await SigningCosmWasmClient.connectWithSigner(
//       rpc,
//       offlineSigner
//     );

//     console.log(client, "SigningCosmWasm");

//     const increaseAllowanceMsg = {
//       increase_allowance: {
//         spender: lpPoolAddress,
//         amount: removeAmount,
//       },
//     };
//     const fee = {
//       amount: coins(1000, "uom"),
//       gas: "200000",
//     };

//     const result = await client.execute(
//       address,
//       lpToken,
//       increaseAllowanceMsg,
//       fee
//     );

//     console.log("Transaction result:", result);

//     WithdrawVault();
//   }

//   return (
//     <div className="flex">
//       <hr className="h-[600px] w-0.25 bg-gray-400 rotate-180 opacity-30" />
//       <div>
//         <div className="flex justify-between items-center p-1 bg-transparent border-[#AB6F55] border-2 w-40 mt-10 ml-5 rounded-lg h-10">
//           <div
//             className={`flex cursor-pointer font-bold font-Poppins rounded-md w-12 h-full justify-center items-center  ${
//               !add ? "" : "bg-[#AB6F55] "
//             }`}
//             onClick={() => {
//               setAdd(true);
//               setRemove(false);
//               console.log(add, remove);
//             }}
//           >
//             Add
//           </div>
//           <div
//             className={`flex cursor-pointer font-bold font-Poppins rounded-md h-full w-20 justify-center items-center ${
//               !remove ? "" : "bg-[#AB6F55]"
//             }`}
//             onClick={() => {
//               setRemove(true);
//               setAdd(false);
//             }}
//           >
//             Remove
//           </div>
//         </div>
//         {add && (
//           <div className="flex flex-col h-full w-full">
//             <div className="flex flex-col bg-site-black bg-opacity-80 border-[#AB6F55] border-2 border-opacity-80 shadow-xl w-[400px] h-28 mt-10 ml-10 rounded-lg">
//               <div className="flex justify-between w-full p-2">
//                 <div>
//                   <input
//                     type="number"
//                     placeholder="0"
//                     className="text-3xl font-extrabold block w-[100%] h-full bg-transparent outline-none"
//                     onChange={(e) => setToken1_amount(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex border-[#AB6F55] border-2 h-12 w-32 p-1 justify-between items-center font-bold rounded-lg border-opacity-40">
//                   <img
//                     src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
//                     className="w-7"
//                   />
//                   wBTC
//                 </div>
//               </div>
//               <div className="flex justify-between p-2">
//                 <div>$0.00</div>
//                 <div className="flex justify-between w-[70px]">
//                   <img src={wallet} className="w-5" />
//                   <span>0.00</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col bg-site-black bg-opacity-80 border-[#AB6F55] border-2 border-opacity-80 shadow-xl w-[400px] h-28 ml-10 mt-10 rounded-lg">
//               <div className="flex justify-between w-full p-2">
//                 <div>
//                   <input
//                     type="number"
//                     placeholder="0"
//                     className="text-3xl font-extrabold block w-[100%] h-full bg-transparent outline-none"
//                     onChange={(e) => setToken2_amount(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex border-[#AB6F55] border-2 h-12 w-32 p-1 justify-between items-center font-bold rounded-lg border-opacity-40">
//                   <img
//                     src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
//                     className="w-7"
//                   />
//                   wBTC
//                 </div>
//               </div>
//               <div className="flex justify-between p-2">
//                 <div>$0.00</div>
//                 <div className="flex justify-between w-[70px]">
//                   <img src={wallet} className="w-5" />
//                   <span>0.00</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-center items-center mt-10 ml-15">
//               {isWalletConnected ? (
//                 <div className="flex justify-center items-center">
//                   <button
//                     className="bg-[#AB6F55] font-Poppins text-xl font-bold text-white w-[370px] py-2 mt-6 rounded-xl"
//                     onClick={AddAllowance1}
//                   >
//                     Add Liquidity
//                   </button>
//                 </div>
//               ) : (
//                 <Wallet />
//               )}
//             </div>
//           </div>
//         )}
//         {remove && (
//           <div>
//             <div className="flex flex-col bg-site-black bg-opacity-80 border-[#AB6F55] border-2 border-opacity-80 shadow-xl w-[400px] h-28 ml-10 mt-10 rounded-lg">
//               <div className="flex justify-between w-full p-2">
//                 <div>
//                   <input
//                     type="number"
//                     placeholder="0"
//                     className="text-3xl font-extrabold block w-[100%] h-full bg-transparent outline-none"
//                     onChange={(e) => setRemoveAmount(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex border-[#AB6F55] border-2 h-12 w-32 p-1 justify-between items-center font-bold rounded-lg border-opacity-40">
//                   <img
//                     src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
//                     className="w-7"
//                   />
//                   wBTC
//                 </div>
//               </div>
//               <div className="flex justify-between p-2">
//                 <div>$0.00</div>
//                 <div className="flex justify-between w-[70px]">
//                   <img src={wallet} className="w-5" />
//                   <span>0.00</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-center items-center mt-10 ml-15">
//               {isWalletConnected ? (
//                 <div className="flex justify-center items-center">
//                   <button
//                     className="bg-[#AB6F55] font-Poppins text-xl font-bold text-white w-[370px] py-2 mt-6 rounded-xl"
//                     onClick={removeAllownace}
//                   >
//                     Withdraw Liquidity
//                   </button>
//                 </div>
//               ) : (
//                 <Wallet />
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PoolForm;

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
  });

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
  });

  const executeTransaction = async (contractAddress, msg, feeType) => {
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
  };

  const addLiquidity = async () => {
    const addLiquidityMsg = {
      add_liquidity: {
        token1_amount: token1Amount,
        min_liquidity: "0",
        max_token2: token2Amount,
      },
    };
    await executeTransaction(lpPoolAddress, addLiquidityMsg, "add");
  };

  const withdrawLiquidity = async () => {
    const removeMsg = {
      remove_liquidity: {
        amount: removeAmount,
        min_token1: "0",
        min_token2: "0",
      },
    };
    await executeTransaction(lpPoolAddress, removeMsg, "remove");
  };

  const increaseAllowance = async (contractAddress, amount) => {
    const increaseAllowanceMsg = {
      increase_allowance: {
        spender: lpPoolAddress,
        amount,
      },
    };
    await executeTransaction(contractAddress, increaseAllowanceMsg, "add");
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
                  <img
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/4114.png"
                    className="w-7"
                    alt="GOLD"
                  />
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
            <div className="flex justify-center items-center mt-10 ml-15">
              {isWalletConnected ? (
                <button
                  className="bg-[#AB6F55] font-Poppins text-xl font-bold text-white w-[370px] py-2 mt-6 rounded-xl"
                  onClick={handleAddLiquidity}
                >
                  Add Liquidity
                </button>
              ) : (
                <Wallet />
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col bg-site-black bg-opacity-80 border-[#AB6F55] border-2 border-opacity-80 shadow-xl w-[400px] h-28 ml-10 mt-10 rounded-lg">
              <div className="flex justify-between w-full p-2">
                <input
                  type="number"
                  placeholder="0"
                  className="text-3xl font-extrabold block w-[100%] h-full bg-transparent outline-none"
                  onChange={(e) => setRemoveAmount(e.target.value)}
                />
                <div className="flex border-[#AB6F55] border-2 h-12 w-[300px] p-1 justify-between items-center font-bold rounded-lg border-opacity-40">
                  <img src={goldToken} className="w-10" alt="wBTC" />
                  GOLD-OM-LP
                </div>
              </div>
              <div className="flex justify-between p-2">
                <div>$0.00</div>
                <div className="flex justify-between w-[110px]">
                  <img src={wallet} className="w-5" alt="Wallet" />
                  <span>{removeBalance ? removeBalance : "0.00"}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-10 ml-15">
              {isWalletConnected ? (
                <button
                  className="bg-[#AB6F55] font-Poppins text-xl font-bold text-white w-[370px] py-2 mt-6 rounded-xl"
                  onClick={handleRemoveLiquidity}
                >
                  Withdraw Liquidity
                </button>
              ) : (
                <Wallet />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolForm;
