import { RestoreWallets } from "../utils/lib"
import { styles } from "../utils/styles"
import { useRef, useContext, useEffect } from "preact/hooks"
import Context from "../utils/context"
import * as storage from "../utils/storage"

export default function Restore() {
    const { state, dispatch } = useContext(Context)
    const nameRef = useRef()
    const passwordRef = useRef()
    const confirmRef = useRef()
    const mnemonicRef = useRef()

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== confirmRef.current.value) {
            dispatch({ type: 'SET_ERROR', param: 'passwords do not match' })
            return
        } else {
            try {
                const wallet = await RestoreWallets(nameRef.current.value, mnemonicRef.current.value)
                console.log("wallet from restore = " ,wallet)
                // encrypt wallet (SHA256) and save to localStorage
                storage.checkWallet(passwordRef.current.value, nameRef.current.value)
                let w = storage.getTempWallet()
                if( w === null )
                {
                   await storage.saveWallet(wallet,passwordRef.current.value, nameRef.current.value)
                }
                w = await storage.getTempWallet()
                console.log("w from storage = " ,w)
                if(wallet.name === w.name)
                {
                    storage.encryptObjectToLocalStorage(wallet,passwordRef.current.value, nameRef.current.value)
                    dispatch({ type: 'SET_VIEW', param: 'dashboard' })
                }
                else
                {
                    dispatch({ type: 'SET_ERROR', param: 'wallet cant be found' })
                }
               
            } catch (e) {
                dispatch({ type: 'SET_ERROR', param: e.message })
            }
        }
    }

    return (
        <>
            <div>
                <div class={styles.subTitle}>Import wallet by mnemonic words</div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div class={styles.label}>Wallet name</div>
                        <div><input type="text" class={styles.textInput} required ref={nameRef} /></div>
                        <div class={styles.label}>Password</div>
                        <div><input type="password" class={styles.textInput} required ref={passwordRef} /></div>
                        <div class={styles.label}>Confirm password</div>
                        <div><input type="password" class={styles.textInput} required ref={confirmRef} /></div>
                        <div class={styles.label}>Mnemonic words</div>
                        <div><textarea rows="5" class={styles.textInput} required ref={mnemonicRef} /></div>
                        <div class="mt-4 mb-2">
                            <button type="submit" class={styles.button}>Import wallet</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}