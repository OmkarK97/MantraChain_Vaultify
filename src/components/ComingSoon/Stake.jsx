import HeaderSwap from "../Swap/HeaderSwap";
import { WavyBackground } from "../ui/wavy-background";

const Stake = () => {
  return (
    <div>
      <HeaderSwap />
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
          Coming Soon
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          Good Things Take Time
        </p>
      </WavyBackground>
    </div>
  );
};

export default Stake;
