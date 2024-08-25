import { useState, useContext, useRef } from "preact/hooks";
import Context from "../utils/context";
import * as storage from "../utils/storage";
import { styles } from "../utils/styles";

export default function WalletDetails() {
  const { state } = useContext(Context);
  const [walletDetails, setWalletDetails] = useState(null);
  const [error, setError] = useState("");
  const passwordRef = useRef();

  const handleUnlock = () => {
    const password = passwordRef.current.value;
    const decryptedWallet = storage.decryptObjectFromLocalStorage(
      password,
      state.wallet.name,
    );

    if (decryptedWallet) {
      setWalletDetails(decryptedWallet);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div>
      <h2 className={styles.subTitle}>Wallet Details</h2>
      {!walletDetails ? (
        <div>
          <div className={styles.label}>Enter your password</div>
          <input
            type="password"
            ref={passwordRef}
            className={styles.textInput}
          />
          <button onClick={handleUnlock} className={`${styles.button} my-4`}>
            Unlock
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <div>
          <p>
            <strong>Mnemonic Phrase:</strong> {walletDetails.mnemonic}
          </p>
          <p>
            <strong>Private Key (BTC):</strong>{" "}
            {walletDetails.mainnet.BTC.privateKey}
          </p>
          <p>
            <strong>Private Key (ETH):</strong>{" "}
            {walletDetails.mainnet.ETH.privateKey}
          </p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}
