import { useState, useContext, useEffect } from "preact/hooks"
import Context from "../utils/context"
import * as storage from "../utils/storage"
import { styles } from "../utils/styles"
import {getBalances } from "../utils/lib"
import CoinTable from "./coinTable"
import CoinAction from "./coinAction"
import DashTitle from "./dashTitle"
import Loading from "./loading"


export default function Dashboard() {
    const { state, dispatch } = useContext(Context)    
    const [firstDivClass, setFirstDivClass] = useState('')
    const [secondDivClass, setSecondDivClass] = useState('translate-x-full')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (state.isSelected) {
            setFirstDivClass('-translate-x-full')
            setSecondDivClass('')
        } else {
            setFirstDivClass('')
            setSecondDivClass('translate-x-full')
        }
    }, [state.isSelected])

    useEffect(() => {
        setLoading(true)
        const w = storage.getTempWallet()
        if (w) {
            console.log(w)
            getBalances(w, dispatch,"testnet")
            .then(setLoading(false))
        } else {
            dispatch({ type: 'SET_VIEW', param: 'home' })
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        const w = storage.getTempWallet()
        if (!state.testnet) {
            setTimeout(()=>{
                getBalances(w, dispatch,"mainnet")
                .then(setLoading(false))
            },1700)
        } else {
            setTimeout(()=>{
                getBalances(w, dispatch,"testnet")
                .then(setLoading(false))
            },1700)
        }
    },  [state.testnet])

    return (
        <>
            {loading ? <div class="flex justify-center mt-12">
                <Loading /></div> : <>
                    <DashTitle />
                    <div className="relative">
                        <div className="flex flex-start overflow-x-hidden">
                            <CoinTable style={firstDivClass} />
                            <CoinAction style={secondDivClass} />
                        </div>
                    </div>
                </>
            }           
        </>
    )
}