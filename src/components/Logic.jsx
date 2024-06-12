/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useChain } from "@cosmos-kit/react";
import { Wallet } from "./wallet/Wallet";
import { coins } from "@cosmjs/stargate";
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";

const contractAddress =
  "mantra1p73558u0g52e96tzna8uhaea0v3mtda7whxqaxq6due44kgvu2aqzjk06h";
const rpc = "https://rpc.hongbai.mantrachain.io";
const tokenContractAddress1 =
  "mantra1mv4f3tne3wsrvu703gkggz8m7cjuce7lgfxhhv90r7syfyg2hgssuc8hup";

const tokenContractAddress2 =
  "mantra1lezfs900eury8mtlncx3mqmtnx674hueteafs7ulzty9s4ftz6nsl3tswt";
const spenderAddress =
  "mantra1azschuzgy8vqjsxznj6mc5wyw0046m0avc8ea40hslmwgp0v286sgvqtr3"; // Replace with the spender's address
const amount = "10000000";

function Logic() {
  const [counterValue, setCounterValue] = useState(null);
  const { address, getOfflineSigner } = useChain("mantrachaintestnet");
  const [incrementCounterValue, setIncrementCounterValue] = useState(null);

  const depositVault = async () => {
    const offlineSigner = getOfflineSigner();
    const client = await SigningCosmWasmClient.connectWithSigner(
      rpc,
      offlineSigner
    );

    const depositAmount = "500000"; // Assuming '500000' is the desired deposit amount

    // Construct the increase allowance message
    const increaseAllowanceMsg = {
      add_liquidity: {
        token1_amount: "5000",
        min_liquidity: "0",
        max_token2: "5000",
      },
    };

    // Prepare the fee
    const fee = {
      amount: coins(2000, "uom"), // Adjust the fee according to your chain
      gas: "3000000",
    };

    // Execute the increase allowance transaction
    const result = await client.execute(
      address,
      spenderAddress,
      increaseAllowanceMsg,
      fee
    );

    // Log the transaction result
    console.log("Transaction result:", result);
  };

  async function increaseAllowance1() {
    // Create a signing client
    const offlineSigner = getOfflineSigner();
    const client = await SigningCosmWasmClient.connectWithSigner(
      rpc,
      offlineSigner
    );

    console.log(client, "SigningCosmWasm");

    // Construct the increase allowance message
    const increaseAllowanceMsg = {
      increase_allowance: {
        spender: spenderAddress,
        amount: amount,
      },
    };

    // console.log(typeof(increaseAllowanceMsg.Cw20ExecuteMsg.IncreaseAllowance.spender))

    // Prepare the fee
    const fee = {
      amount: coins(2000, "uom"), // Adjust the fee according to your chain
      gas: "200000",
    };

    // Execute the increase allowance transaction
    const result = await client.execute(
      address,
      tokenContractAddress1,
      increaseAllowanceMsg,
      fee
    );

    // Log the transaction result
    console.log("Transaction result:", result);
  }

  async function increaseAllowance2() {
    // Create a signing client
    const offlineSigner = getOfflineSigner();
    const client = await SigningCosmWasmClient.connectWithSigner(
      rpc,
      offlineSigner
    );

    console.log(client, "SigningCosmWasm");

    // Construct the increase allowance message
    const increaseAllowanceMsg = {
      increase_allowance: {
        spender: spenderAddress,
        amount: amount,
      },
    };

    // console.log(typeof(increaseAllowanceMsg.Cw20ExecuteMsg.IncreaseAllowance.spender))

    // Prepare the fee
    const fee = {
      amount: coins(2000, "uom"), // Adjust the fee according to your chain
      gas: "200000",
    };

    // Execute the increase allowance transaction
    const result = await client.execute(
      address,
      tokenContractAddress2,
      increaseAllowanceMsg,
      fee
    );

    // Log the transaction result
    console.log("Transaction result:", result);
  }

  const queryCounter = async () => {
    try {
      const client = await CosmWasmClient.connect(rpc);
      const response = await client.queryContractSmart(spenderAddress, {
        info: {},
      });
      setCounterValue(response);
    } catch (error) {
      console.error("Error querying contract:", error);
    }
  };

  console.log(counterValue);

  const executeIncrement = async () => {
    try {
      const offlineSigner = getOfflineSigner();
      const signer = await SigningCosmWasmClient.connectWithSigner(
        rpc,
        offlineSigner
      );

      const executeMsg = {
        increment_counter: {
          val: incrementCounterValue,
        },
      };

      // Prepare the fee
      const fee = {
        amount: coins(2000, "uom"), // Adjust fee according to your chain
        gas: "200000",
      };

      // Execute the transaction
      const result = await signer.execute(
        address,
        contractAddress,
        executeMsg,
        fee
      );
      const hello = await signer.console.log("Transaction result:", result);

      // Query counter after executing increment
      queryCounter();
    } catch (error) {
      console.error("Error executing contract:", error);
    }
  };

  // console.log(chain.fees.fee_tokens[0].denom)

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="h-20 w-full flex justify-between p-5">
        <div className="flex flex-col">
          {/* <h1 className="text-white">Counter: {counterValue}</h1> */}
          <div>
            <input
              type="number"
              className="text-white p-2 bg-gray-800"
              onChange={(e) =>
                setIncrementCounterValue(parseInt(e.target.value))
              }
            />
            <button
              className="ml-2 p-2 bg-blue-600 text-white"
              onClick={increaseAllowance1}
            >
              Allownce 1
            </button>
            <button
              className="ml-2 p-2 bg-blue-600 text-white"
              onClick={increaseAllowance2}
            >
              Allownce 2
            </button>
            <button
              className="ml-2 p-2 bg-blue-600 text-white"
              onClick={queryCounter}
            >
              Query
            </button>
            <button
              className="ml-2 p-2 bg-blue-600 text-white"
              onClick={depositVault}
            >
              Deposit
            </button>
          </div>
        </div>
        <div>
          <Wallet />
        </div>
      </div>
    </div>
  );
}

export default Logic;
