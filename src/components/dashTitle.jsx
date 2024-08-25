import { useState, useContext, useEffect } from "preact/hooks"
import Context from "../utils/context"
import { price, change, cost } from "../utils/utils"


export default function DashTitle() {
    const { state, dispatch } = useContext(Context)
    const [symbol, setSymbol] = useState('')

    useEffect(() => {
        if (state.selectedCoin) {
            setSymbol(state.testnet ? state.selectedCoin.substr(1) : state.selectedCoin)
        }
    }, [state.selectedCoin])
    return (
        <>
            <div class="mb-8 mt-4">
                {state.isSelected ? <>                  
                    <div>
                       
                        <div class="flex justify-center gap-1 text-sm pt-1 text-gray-400">
                            <div>price:</div>
                            <div class="flex justify-start gap-1">
                                <div class="font-bold">$ {price(state)}</div>
                                <div class={"font-bold " + change(state).color}>{change(state).change}</div>
                            </div>
                            <div>cost:</div>
                            <div class="font-bold">$ {cost(state)}</div>
                        </div>
                        <div class="mb-0 flex justify-center gap-2 text-4xl">
                            <div class="">{(state.balances[state.selectedCoin] ?? 0).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                            <div class="text-xl pt-3 font-bold text-gray-500">{state.selectedCoin}</div>
                        </div>

                    </div></> :
                    <div>
                        <div class="text-gray-400 mb-0 text-center">Balance</div>
                        <div class="text-center text-4xl">$ {state.balance}</div>
                    </div>}
            </div>
        </>)
}