import styles from "../styles";
import AmountIn from "./AmountIn";
import AmountOut from "./AmountOut";
import Balance from "./Balance";

const Content = () => {
  const canApprove = true;
  const isApproving = false;

  return (
    <div className="flex flex-col w-full items-center">
      <div className="mb-8 w-[100%]">
        <AmountIn
          value="10"
          onChange="hello"
          currencyValue="BTC"
          onSelect="select"
          currencies="ETH"
          isSwapping={true}
        />
        <Balance tokenBalance="0.005" />
      </div>
      <div className="mb-8 w-[100%]">
        <AmountOut
          value="10"
          onChange="hello"
          currencyValue="BTC"
          onSelect="select"
          currencies="ETH"
          isSwapping={true}
        />
        <Balance tokenBalance="1.273" />
      </div>
      <button
        disabled={false}
        onClick={() => alert("hi")}
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
