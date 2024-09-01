import { useContext, useEffect } from "preact/hooks";
import Context from "../utils/context";
import { price, change, cost } from "../utils/utils";

export default function Coin({ sym, val, cb }) {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {}, [state.selectedCoin]);

  return (
    <>
      <div
        class="grid grid-cols-2 gap-1 text-gray-400 text-xs border-b-2 border-gray-200 pt-2 pb-2 mb-0 mt-0 pl-5 pr-5 hover:bg-gray-200 cursor-pointer"
        onClick={() => cb(sym)}
      >
        <div class="flex justify-start gap-2">
          <div>
            <img src={val.coinInfo.image} class="w-14 h-14" />
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
                className="p-0 mr-1 text-white border-gray-300 border-0 rounded"
                onClick={() => cb(sym)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  fill="#ff7102"
                  class="bi bi-arrow-right-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
