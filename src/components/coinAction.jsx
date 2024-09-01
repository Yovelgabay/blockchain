import cn from "classnames";
import { useState, useContext, useEffect } from "preact/hooks";
import Context from "../utils/context";
import QRCodeDisplay from "./qrCodeDisplay";
import AddressDisplay from "./addressDisplay";
import CoinSend from "./coinSend";

export default function CoinAction({ style }) {
  const { state, dispatch } = useContext(Context);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (state.wallet && state.selectedCoin) {
      const selectedCoinData =
        state.wallet[state.testnet ? "testnet" : "mainnet"][state.selectedCoin];
      if (selectedCoinData) {
        setAddress(selectedCoinData.address);
      }
    }
  }, [state.wallet, state.selectedCoin]);

  return (
    <div
      className={cn(
        " transition-all duration-200 transform bg-white shadow-lg rounded-lg p-6",
        style,
      )}
    >
      <div className="border-b-2 border-gray-200 mb-4 pb-2 flex justify-between">
        <div className="text-gray-600 font-bold">
          <button
            className={`mr-4 ${
              state.send ? "text-orange-500" : "text-gray-500"
            }`}
            onClick={() => dispatch({ type: "SET_SEND", param: false })}
          >
            Receive
          </button>
          <button
            className={`${state.send ? "text-gray-500" : "text-orange-500"}`}
            onClick={() => dispatch({ type: "SET_SEND", param: true })}
          >
            Send
          </button>
        </div>
        <button
          onClick={() =>
            dispatch({
              type: "SET_IS_SELECTED",
              param: { isSelected: false, coin: null },
            })
          }
          className="text-gray-500 hover:text-gray-800"
        >
          ✕ Close
        </button>
      </div>
      {address &&
        (state.send ? (
          <CoinSend address={address} symbol={state.selectedCoin} />
        ) : (
          <>
            <AddressDisplay address={address} symbol={state.selectedCoin} />
            <QRCodeDisplay address={address} />
          </>
        ))}
    </div>
  );
}
