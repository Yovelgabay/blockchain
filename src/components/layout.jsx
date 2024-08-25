import { useState, useEffect, useContext } from "preact/hooks";
import { styles } from "../utils/styles";
import Context from "../utils/context";
import Error from "./error";
import * as storage from "../utils/storage";

export default function Layout({ children }) {
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState("Hello <br/> Welcome to HD Wallet!");

  useEffect(() => {
    const wallet = storage.getTempWallet();
    if (wallet) {
      dispatch({ type: "SET_VIEW", param: "dashboard" });
      setTitle(
        `<span class='text-gray-400'></span><span>${wallet.name}</span>`,
      );
    } else {
      dispatch({ type: "SET_VIEW", param: "home" });
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_ERROR", param: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.error, dispatch]);

  return (
    <div className="w-full  max-w-4xl mx-auto my-10 border border-gray-300 rounded-lg shadow-md bg-white overflow-hidden">
      <div
        className={`${styles.layoutNav} bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-t-lg`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: state.wallet
              ? `<span>Wallet:</span> <span>${title}</span>`
              : title,
          }}
          className="text-xl font-semibold"
        />
      </div>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="lg:w-1/4 bg-gray-200 p-6">
          {state.view === "dashboard" ? (
            <>
              <button
                className={`${styles.link} w-full text-left mb-2`}
                onClick={() => dispatch({ type: "SET_VIEW", param: "walletDetails" })}
              >
                Wallet Details
              </button>
              <button
                className={`${styles.link} w-full text-left`}
                onClick={() => dispatch({ type: "EXIT" })}
              >
                Exit Wallet
              </button>
            </>
          ) : state.view !== "home" && state.view !== "dashboard" ? (
            <>
              <button
                className={`${styles.link} w-full text-left mb-2`}
                onClick={() => dispatch({ type: "SET_VIEW", param: "dashboard" })}
              >
                Go to Wallet Home
              </button>
              <button
                className={`${styles.link} w-full text-left`}
                onClick={() => dispatch({ type: "SET_VIEW", param: "home" })}
              >
                Exit wallet
              </button>
            </>
          ) : null}
        </div>
        <div className="flex-grow bg-white p-6 overflow-y-auto">
          {children}
          {state.error && (
            <div className="relative mt-4">
              <Error text={state.error} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
