import { useEffect, useState } from "react";
import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { coins } from "@cosmjs/stargate";
import { useChain } from "@cosmos-kit/react";
import { toast, ToastContainer } from "react-toastify";

const rpc = "https://rpc.hongbai.mantrachain.io";
const fee = {
  add: { amount: coins(2000, "uom"), gas: "3000000" },
  remove: { amount: coins(1000, "uom"), gas: "3000000" },
};

const DepositToken =
  "mantra1q3ctduh25f5cauakh54xv70ckfug24nuk6wv4wn2f5fusee9tq0swap24j";
const VaultAddress =
  "mantra1xms03jykg6e2g402dxj3cw4q6ygm0r5rctdt5d7j99xehwtevm3senz46v";

const VaultManager = ({ isOpen, onClose, vault }) => {
  const { getOfflineSigner, address } = useChain("mantrachaintestnet");

  const [activeTab, setActiveTab] = useState("stake");
  const [DepositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [DepositBalance, setDepositBalance] = useState("0");
  const [withdrawBalance, setWithdrawBalance] = useState("0");

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

  useEffect(() => {
    QueryBalance();
  });

  const increaseAllowance = async (contractAddress, amount) => {
    const increaseAllowanceMsg = {
      increase_allowance: {
        spender: VaultAddress,
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

  const Deposit = async () => {
    const depositMsg = {
      deposit: {
        amount: DepositAmount,
      },
    };
    await executeTransaction(
      VaultAddress,
      depositMsg,
      "Deposit was successfull!",
      "add"
    );
  };

  const Withdraw = async () => {
    const depositMsg = {
      withdraw: {
        share: withdrawAmount,
      },
    };
    await executeTransaction(
      VaultAddress,
      depositMsg,
      "Withdraw was successfull!",
      "add"
    );
  };

  const QueryBalance = async () => {
    try {
      const client = await CosmWasmClient.connect(rpc);
      const response1 = await client.queryContractSmart(DepositToken, {
        balance: { address: address },
      });
      const response2 = await client.queryContractSmart(VaultAddress, {
        get_balance_of: { address: address },
      });
      const parseBalance1 = parseInt(response1.balance);
      const finalBalance1 = parseBalance1 / 1000000;
      const parseBalance2 = parseInt(response2);
      const finalBalance2 = parseBalance2 / 1000000;
      setDepositBalance(finalBalance1);
      setWithdrawBalance(finalBalance2);
    } catch (error) {
      console.error("Error querying contract:", error);
    }
  };

  const handleDeposit = async () => {
    await increaseAllowance(DepositToken, DepositAmount);
    await Deposit();
    await QueryBalance();
  };

  const handleWithdraw = async () => {
    await Withdraw();
    await QueryBalance();
  };

  if (!isOpen) return null;

  return (
    <div className="h-full w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <ToastContainer />
      <div className="bg-site-black rounded-lg w-1/3">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Manage {vault.title}</h2>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>
        <div className="p-4">
          <div className="flex justify-around mb-4 w-full h-full">
            <button
              onClick={() => setActiveTab("stake")}
              className={`px-4 py-2 rounded w-full ${
                activeTab === "stake"
                  ? "bg-purple-600 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => setActiveTab("unstake")}
              className={`px-4 py-2 rounded w-full ${
                activeTab === "unstake"
                  ? "bg-purple-600 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              Withdraw
            </button>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="number"
              placeholder="Amount"
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => {
                setDepositAmount(e.target.value),
                  setWithdrawAmount(e.target.value);
              }}
            />
            <button className="ml-2 px-4 py-2 bg-purple-600 rounded">
              Max
            </button>
          </div>
          <div className=" flex justify-between mb-4">
            <div className="flex-col">
              <p>APY: {vault.apy}</p>
              <p>TVL: {vault.tvl}</p>
            </div>
            <p>
              {activeTab === "stake"
                ? `Balance: ${DepositBalance}`
                : `Balance: ${withdrawBalance}`}
            </p>
          </div>
        </div>
        <div className="flex justify-center p-4 ">
          {activeTab === "stake" && (
            <button
              className="px-4 py-2 w-[50%] bg-purple-600 text-white rounded-lg"
              onClick={handleDeposit}
            >
              Deposit
            </button>
          )}
          {activeTab === "unstake" && (
            <button
              className="px-4 py-2 w-[50%] bg-purple-600 text-white rounded-lg"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaultManager;
