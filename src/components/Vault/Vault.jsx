import { useState } from "react";
import { bag, vault } from "../../assets";
import { VaultDetails } from "../../constants";
import Cards from "./Cards";
import VaultManager from "./VaultManager"; // Import the new component

const VaultItem = ({ title, apy, tvl, onClick }) => (
  <div className="vault-item" onClick={onClick}>
    <div className="w-full h-full flex justify-between p-5 cursor-pointer bg-site-black bg-opacity-60 border-white border-2 rounded-xl">
      <span className="flex justify-start m-3 w-[50%] text-xl font-bold">
        {title}
      </span>
      <span className="flex justify-center w-[33%] m-3 ml-2">APY: {apy}</span>
      <span className="flex justify-end w-[33%] m-3">TVL: {tvl}</span>
    </div>
  </div>
);

const Vault = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState(null);

  const openModal = (vault) => {
    setSelectedVault(vault);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVault(null);
  };

  return (
    <div>
      <div className="pink_gradient" />
      <div className="flex w-full">
        <div className="flex flex-col w-[50%] m-10 mt-24">
          <span className="text-5xl font-extrabold mb-10">
            Simple, Smart, and Trusted Way to Invest in Crypto
          </span>
          <span className="text-xl font-light">
            If you&apos;re interested in investing in Mantra but have been put
            off by the complexity of purchasing and storing digital assets
            yourself, we&apos;ve made it simple for you.
          </span>
        </div>
        <div className="flex justify-center w-[50%] mt-10">
          <img src={vault} className="w-[60%]" alt="Vault" />
        </div>
      </div>
      <div className="m-10 text-2xl font-bold">Highest APY</div>
      <div className="flex -m-4 w-[80%] mx-auto mt-10">
        {VaultDetails.map((card) => (
          <Cards
            key={card.id}
            title={card.title}
            percentage={card.percentage}
            time={card.time}
          />
        ))}
      </div>
      <div className="m-10 mt-20 text-2xl font-bold">All Vaults</div>
      <div className="w-full flex">
        <div className="w-[50%] flex flex-col m-10 gap-10">
          <VaultItem
            title="Gold-Silver 50-50 Vault"
            apy="7.89%"
            tvl="150k"
            onClick={() =>
              openModal({
                title: "Gold-Silver 50-50 Vault",
                apy: "7.89%",
                tvl: "150k",
              })
            }
          />
          <VaultItem
            title="Gold Vault"
            apy="10.89%"
            tvl="100k"
            onClick={() =>
              openModal({ title: "Gold Vault", apy: "7%", tvl: "100k" })
            }
          />
          <VaultItem
            title="Silver Vault"
            apy="12.89%"
            tvl="150k"
            onClick={() =>
              openModal({ title: "Silver Vault", apy: "10%", tvl: "150k" })
            }
          />
        </div>
        <div className="flex justify-center items-center w-[50%]">
          <img src={bag} className="w-[50%]" alt="Bag" />
        </div>
      </div>
      <div className="blue_gradient" />
      <VaultManager
        isOpen={isModalOpen}
        onClose={closeModal}
        vault={selectedVault}
      />
    </div>
  );
};

export default Vault;
