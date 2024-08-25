import cn from 'classnames'
import { useState, useContext, useEffect, useRef } from "preact/hooks"
import Context from "../utils/context"
import { styles } from "../utils/styles"
import QRCodeDisplay from './qrCodeDisplay'
import AddressDisplay from './addressDisplay'
import CoinSend from './coinSend'

export default function CoinAction({ style }) {
    const { state, dispatch } = useContext(Context)
    const [address, setAddress] = useState(null)
    useEffect(() => {
        if (state.wallet && state.selectedCoin && state.wallet[(state.testnet ? 'testnet' : 'mainnet')][state.selectedCoin]) {
            setAddress(state.wallet[(state.testnet ? 'testnet' : 'mainnet')][state.selectedCoin].address)
            
        }
    }, [state.wallet, state.selectedCoin])
    
    return (
        <div class={cn('w-full top-0 transition-all duration-200 transform z-20 relative', style)}>
            <div class="border-b-2 border-gray-200 mb-4">
                <div class="flex justify-between z-10">
                    <div class="flex justify-start gap-1 text-gray-400 mb-1 text-sm font-bold">
                        <div class={state.send ? styles.smButton : styles.smButtonA} onClick={() => dispatch({ type: 'SET_SEND', param: false })}>Receive</div>
                        <div class={state.send ? styles.smButtonA : styles.smButton} onClick={() => dispatch({ type: 'SET_SEND', param: true })}>Send</div>
                    </div>
                </div>
                <button onClick={() => dispatch({ type: 'SET_IS_SELECTED', param: { isSelected: false, coin: null } })} class={"absolute top-1 right-2 z-30 " + styles.link}>close</button>
            </div>
            <div>
                {address && (
                    state.send ? <>
                        <CoinSend address={address} symbol={state.selectedCoin} />
                        </> : <>
                            <AddressDisplay address={address} symbol={state.selectedCoin} />
                            <QRCodeDisplay address={address} />
                        </>
                )}
            </div>
        </div>
    )
}