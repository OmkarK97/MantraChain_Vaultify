import React, { useEffect, useRef, useState } from "react";
import styles from "../styles";
import { useOnClickOutside } from "../../../../utils/index";
import { chevronDown } from "../../../assets";

const AmountOut = ({
  value,
  onChange,
  currencyValue,
  onSelect,
  currencies,
  isSwapping,
}) => {
  const [showList, setShowList] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState(currencyValue);
  const ref = useRef();

  useOnClickOutside(ref, () => setShowList(false));

  useEffect(() => {
    if (currencies.includes(currencyValue)) {
      setActiveCurrency(currencyValue);
    } else {
      setActiveCurrency("Select");
    }
  }, [currencies, currencyValue]);

  return (
    <div className={styles.amountContainer}>
      <input
        placeholder="0.0"
        type="number"
        value={value}
        disabled={isSwapping}
        onChange={(e) =>
          typeof onChange === "function" && onChange(e.target.value)
        }
        className={styles.amountInput}
      />

      <div className="relative" onClick={() => setShowList(!showList)}>
        <button className={styles.currencyButton}>
          {activeCurrency}
          <img
            src={chevronDown}
            alt="chevron-down"
            className={`w-4 h-4 object-contain ml-2 ${
              showList ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {showList && (
          <ul ref={ref} className={styles.currencyList}>
            {currencies.map((token, index) => (
              <li
                key={index}
                className={`${styles.currencyListItem} ${
                  activeCurrency === token ? "bg-site-dim2" : ""
                } cursor-pointer`}
                onClick={() => {
                  if (typeof onSelect === "function") onSelect(token);
                  setActiveCurrency(token);
                  setShowList(false);
                }}
              >
                {token}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AmountOut;
