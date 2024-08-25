import { useContext, useEffect } from "preact/hooks";
import Context from "../utils/context";
import { price, change, cost } from "../utils/utils";

export default function Coin({ sym, val, cb }) {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    // Optionally, refetch balances and tickers when needed
    // fetchBalancesAndTickers();
  }, [state.selectedCoin]);

  return (
    <>
      <div
        class="grid grid-cols-2 gap-1 text-gray-400 text-xs border-b-2 border-gray-200 pt-2 pb-2 mb-0 mt-0 pl-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => cb(sym)}
      >
        <div class="flex justify-start gap-3">
          <div>
            <img src={val.coinInfo.image} class="w-9 h-9" />
          </div>
          <div>
            <div class="flex justify-start gap-1 text-sm">
              <div class="text-gray-600 font-bold">{val.coinInfo.id}</div>
              <div>{sym}</div>
            </div>
            {state.tickers && (
              <div class="flex justify-start gap-1 whitespace-nowrap">
                <div class="text-gray-600">$</div>
                <div class="text-gray-600">{price(state, sym)}</div>
                <div class={"font-bold " + change(state, sym).color}>
                  {change(state, sym).change}
                </div>
              </div>
            )}
          </div>
        </div>
        <div class="flex justify-between">
          {state.balances !== undefined ? (
            <div>
              <div class="text-gray-600 text-sm">
                {isNaN(state.balances[sym]) ? 0 : state.balances[sym]}
              </div>
              <div class="text-gray-600">
                ${isNaN(cost(state, sym)) ? 0 : cost(state, sym)}
              </div>
            </div>
          ) : (
            <div>
              <div class="text-gray-600 text-sm">0</div>
              <div class="text-gray-600">0</div>
            </div>
          )}
          {cb && (
            <div class="pt-2">
              <button
                title="send/receive"
                className="p-0 m-0 text-white border-gray-300 border-0 rounded"
                onClick={() => cb(sym)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="h-5 w-5"
                  fill="gray"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
