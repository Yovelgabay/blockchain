import cn from 'classnames'
import { useContext } from "preact/hooks"
import Context from "../utils/context"
import Coin from "./coin"

export default function CoinTable({style}) {
    const { state, dispatch } = useContext(Context)

    return (<div className={cn('w-full absolute top-0 transition-all duration-200 transform', style)}>
        <div class="grid grid-cols-2 gap-1 text-gray-400 border-b-2 border-gray-200 mb-0 pb-1 text-sm font-bold">
            <div>My assets</div>
            <div>Amount/Cost</div>
        </div>
        <div class="pb-4 pt-0">
            {
                state.wallet && Object.entries(state.wallet[(state.testnet ? 'testnet' : 'mainnet')]).map(([k, v]) => <Coin sym={k} val={v} cb={()=>dispatch({type:'SET_IS_SELECTED',param:{isSelected:true,coin:k}})} />)
            }
        </div>
    </div>)
}