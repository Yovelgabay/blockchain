import { styles } from "../utils/styles";
import { useContext } from "preact/hooks";
import Context from "../utils/context";

export default function Home() {
  const { state, dispatch } = useContext(Context);

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-gray-50 ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to Your HD Wallet
        </h1>
        <div className="flex flex-col gap-4">
          <div
            className={styles.link}
            onClick={() => dispatch({ type: "SET_VIEW", param: "existing" })}
          >
            Open Existing Wallet
          </div>
          <div
            className={styles.link}
            onClick={() => dispatch({ type: "SET_VIEW", param: "create" })}
          >
            Create New Wallet
          </div>
          <div
            className={styles.link}
            onClick={() => dispatch({ type: "SET_VIEW", param: "restore" })}
          >
            Import Wallet by Mnemonic Phrase
          </div>
        </div>
      </div>
    </div>
  );
}
