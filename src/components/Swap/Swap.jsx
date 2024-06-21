/* eslint-disable no-unused-vars */

import Content from "./componets/Content.jsx";
import styles from "./styles/index.js";

const Swap = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.exchangeContainer}>
          <h1 className={styles.headTitle}>Swap Tokens</h1>
          <p className={styles.subTitle}>Exchange tokens in seconds</p>

          <div className={styles.exchangeBoxWrapper}>
            <div className={styles.exchangeBox}>
              <div className="pink_gradient" />
              <div className={styles.exchange}>
                <Content />
              </div>
              <div className="blue_gradient" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
