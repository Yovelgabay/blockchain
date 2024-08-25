import { useState, useEffect, useContext } from 'react'
import { styles } from "../utils/styles"
import Context from "../utils/context"

export default function DashboardTitle() {
    const { state, dispatch } = useContext(Context)

    return <>
        <div class="flex justify-between gap-1">
            <div class="flex justify-start gap-1">
                <span class="truncate">{state.wallet.name}</span>
            </div>
            {state.selectedCoin ? <div class="text-gray-400">{state.testnet ? 'testnet' : 'mainnet'}</div> :
                <div class="flex justify-end gap-1">
                    <div class={state.testnet ? styles.smButton : styles.smButtonA} onClick={() => dispatch({ type: 'SET_TESTNET', param: false })}>Mainnet</div>
                    <div class={state.testnet ? styles.smButtonA : styles.smButton} onClick={() => dispatch({ type: 'SET_TESTNET', param: true })}>Testnet</div>
                </div>}
        </div>
    </>

}