/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "../styles";
import AmountIn from "./AmountIn";
import AmountOut from "./AmountOut";
import Balance from "./Balance";
import { useChain } from "@cosmos-kit/react";
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

const gToken =
  "mantra1xursp6m3mftl2e5n7xy6nqg43sxu3s0ta3ryygh6nugxgvttwg8sdj9q44";

const uToken =
  "mantra1q3ctduh25f5cauakh54xv70ckfug24nuk6wv4wn2f5fusee9tq0swap24j";

const lpPoolAddress =
  "mantra1h6563l6sf5tdp0wxewgayyn2f98g3sq3er5r2ux9gnawhxafcquqmfysza";

const Content = () => {
  const canApprove = true;
  const isApproving = false;

  const { getOfflineSigner, address } = useChain("mantrachaintestnet");

  const [fromValue, setFromValue] = useState("0");
  const [toValue, setToValue] = useState("0");
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [calToken2, setCalToken2] = useState("");
  const availableTokens = ["GOLD", "SILVER", "TSLA"];
  const [token1_Balance, setToken1_Balance] = useState(0);
  const [token2_Balance, setToken2_Balance] = useState(0);

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

  const QueryBalance = async () => {
    try {
      const client = await CosmWasmClient.connect(rpc);
      const response1 = await client.queryContractSmart(gToken, {
        balance: { address: address },
      });
      const response2 = await client.queryContractSmart(uToken, {
        balance: { address: address },
      });
      const parseBalance1 = parseInt(response1.balance);
      const finalBalance1 = parseBalance1 / 1000000;
      const parseBalance2 = parseInt(response2.balance);
      const finalBalance2 = parseBalance2 / 1000000;
      setToken1_Balance(finalBalance1);
      console.log(response1.balance, "response1");
      setToken2_Balance(finalBalance2);
    } catch (error) {
      console.error("Error querying contract:", error);
    }
  };

  useEffect(() => {
    QueryBalance();
  });

  useEffect(() => {
    const debounceDelay = 300;

    const query = async () => {
      const client = await CosmWasmClient.connect(rpc);
      const response = await client.queryContractSmart(lpPoolAddress, {
        token1_for_token2_price: { token1_amount: fromValue },
      });
      setCalToken2(response.token2_amount);
    };

    const handler = setTimeout(() => {
      query();
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [fromValue]);

  const onFromValueChange = (value) => {
    setFromValue(value.trim());
  };

  const onFromTokenChange = (value) => {
    setFromToken(value);
  };

  const onToValueChange = (value) => {
    setToValue(value.trim());
  };

  const onToTokenChange = (value) => {
    setToToken(value);
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

  const swapToken = async () => {
    const addLiquidityMsg = {
      swap: {
        input_token: "Token1",
        input_amount: fromValue,
        min_output: "0",
      },
    };
    await executeTransaction(lpPoolAddress, addLiquidityMsg, "add");
  };

  const handleApprove = async () => {
    await increaseAllowance(gToken, fromValue);
    await swapToken();
    await QueryBalance();
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="mb-8 w-[100%]">
        <AmountIn
          value={fromValue}
          onChange={onFromValueChange}
          currencyValue={fromToken}
          onSelect={onFromTokenChange}
          currencies={"OM"}
          isSwapping={false}
        />
        <Balance tokenBalance={token1_Balance ? token1_Balance : "0.00"} />
      </div>
      <div className="mb-8 w-[100%]">
        <AmountOut
          value={calToken2}
          onChange={onToValueChange}
          currencyValue={toToken}
          onSelect={onToTokenChange}
          currencies={availableTokens}
          isSwapping={false}
        />
        <Balance tokenBalance={token2_Balance ? token2_Balance : "0.00"} />
      </div>
      <button
        disabled={false}
        onClick={handleApprove}
        className={`${
          canApprove ? "bg-site-pink text-white" : "bg-site-dim2 text-site-dim2"
        } ${styles.actionButton}`}
      >
        {isApproving ? "Approving..." : "Approve"}
      </button>
    </div>
  );
};

export default Content;
