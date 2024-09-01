import cn from "classnames";
import { useContext } from "preact/hooks";
import Context from "../utils/context";
import Coin from "./coin";

export default function CoinTable({ style }) {
  const { state, dispatch } = useContext(Context);

  return (
    <div
      className={cn(
        " p-4 bg-white shadow-lg rounded-lg",
        style,
      )}
    >
      <div className="grid grid-cols-2 gap-10 text-gray-600 font-bold border-b-2 border-gray-200 pb-2">
        <div>My assets</div>
        <div>Amount/Cost</div>
      </div>
      <div className="pt-4">
        {state.wallet &&
          Object.entries(
            state.wallet[state.testnet ? "testnet" : "mainnet"],
          ).map(([k, v]) => (
            <Coin
              sym={k}
              val={v}
              cb={() =>
                dispatch({
                  type: "SET_IS_SELECTED",
                  param: { isSelected: true, coin: k },
                })
              }
            />
          ))}
      </div>
    </div>
  );
}
