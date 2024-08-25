import { useRef, useEffect, useState, useContext } from 'react'
import { styles } from '../utils/styles'
import Context from "../utils/context"
import { price,round } from '../utils/utils'
import LayoutModal from "./layoutModal"
import {send} from '../utils/lib'

export default function CoinSend({ address, symbol }) {
    const { state, dispatch } = useContext(Context)
    const [showModal, setShowModal] = useState(false)
    const [sendStatus,setSendStatus] = useState('Loading')
    const addressRef = useRef()
    const amountRefC = useRef()
    const amountRefU = useRef()
    const privateKeyRef = useRef()


    useEffect(() => {
        addressRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowModal(true)
        send(addressRef.current.value,symbol,amountRefC.current.value,privateKeyRef.current.value).then((result) =>{
            setSendStatus(result)
        })
        console.log(send)
    }

    const changeU = (e) => {
        amountRefC.current.value = round((e.target.value / price(state,null,true)),6)
    }

    const changeC = (e) => {
        amountRefU.current.value = round((e.target.value * price(state,null,true)),2)
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div class="flex flex-col gap-1">
                <div class={styles.label}>Private Key</div>
                <div><input type="text" class={styles.textInput} required ref={privateKeyRef} /></div>                
                <div class={styles.label}>Recepient</div>
                <div><input type="text" class={styles.textInput} required ref={addressRef} /></div>                
                <div class="grid grid-cols-5 gap-3">
                    <div class="col-span-3">
                        <div class={styles.label}>Amount in {symbol}</div>
                        <div><input type="number" class={styles.textInput + " truncate"} required ref={amountRefC} min={0}
                            onInput={changeC} step={0.000001}/></div>
                    </div>
                    <div class="col-span-2">
                        <div class={styles.label}>Amount in USD</div>
                        <div><input type="number" class={styles.textInput} required ref={amountRefU} min={0} step={0.01}
                        onInput={changeU}/></div>
                    </div>
                </div>
                <div class="mt-8 mb-2">
                    <button type="submit" class={styles.button}>Submit transaction</button>
                </div>
            </div>
        </form>
        {showModal && (
                <LayoutModal close={() => setShowModal(false)}>
                    <div class="flex justify-between gap-2">
                       Send Money
                    </div>
                    <div className="mt-2" >
                        <p>
                            {sendStatus}
                        </p>
                    </div>
                </LayoutModal>
            )}
        </>
    )
}