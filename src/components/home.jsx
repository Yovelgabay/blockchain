import { styles } from "../utils/styles";
import { useContext } from "preact/hooks";
import Context from "../utils/context";

// Import the images
import createWalletIcon from "../assets/create_new_wallet_basic_light.svg";
import openWalletIcon from "../assets/open_existing_wallet_basic_light.svg";
import restoreWalletIcon from "../assets/restore_by_mnemonic_basic_light.svg";

export default function Home() {
  const { state, dispatch } = useContext(Context);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Welcome to Your HD Wallet
        </h1>
        <div className="flex flex-col gap-6">
          <div
            className={`${styles.link} flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer`}
            onClick={() => dispatch({ type: "SET_VIEW", param: "create" })}
          >
            <img src={createWalletIcon} alt="Create New Wallet" className="w-8 h-8 mr-4" />
            <span>Create New Wallet</span>
          </div>
          <div
            className={`${styles.link} flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer`}
            onClick={() => dispatch({ type: "SET_VIEW", param: "existing" })}
          >
            <img src={openWalletIcon} alt="Open Existing Wallet" className="w-8 h-8 mr-4" />
            <span>Open Existing Wallet</span>
          </div>
          <div
            className={`${styles.link} flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer`}
            onClick={() => dispatch({ type: "SET_VIEW", param: "restore" })}
          >
            <img src={restoreWalletIcon} alt="Restore Wallet" className="w-8 h-8 mr-4" />
            <span>Restore Using Recovery Phrase</span>
          </div>
        </div>
      </div>
    </div>
  );
}
