import { useState, useContext, useEffect } from "preact/hooks";
import Context from "../utils/context";
import * as storage from "../utils/storage";
import { getBalances } from "../utils/lib";
import CoinTable from "./coinTable";
import CoinAction from "./coinAction";
import DashTitle from "./dashTitle";
import Loading from "./loading";

export default function Dashboard() {
    const { state, dispatch } = useContext(Context);
    const [firstDivClass, setFirstDivClass] = useState('');
    const [secondDivClass, setSecondDivClass] = useState('hidden');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (state.isSelected) {
            setSecondDivClass('block transition-all transform translate-y-0');
        } else {
            setSecondDivClass('hidden transition-all transform -translate-y-full');
        }
    }, [state.isSelected]);

    useEffect(() => {
        setLoading(true);
        const w = storage.getTempWallet();
        if (w) {
            console.log(w);
            getBalances(w, dispatch, "testnet")
            .then(setLoading(false));
        } else {
            dispatch({ type: 'SET_VIEW', param: 'home' });
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        const w = storage.getTempWallet();
        const fetchBalances = state.testnet ? "testnet" : "mainnet";
        setTimeout(() => {
            getBalances(w, dispatch, fetchBalances)
            .then(setLoading(false));
        }, 1700);
    }, [state.testnet]);

    return (
        <>
            {loading ? (
                <div className="flex justify-center mt-12">
                    <Loading />
                </div>
            ) : (
                <>
                    <DashTitle />
                    <div className="relative">
                        <div className="space-y-4">
                            <CoinTable style={firstDivClass} />
                            <div className={secondDivClass}>
                                <CoinAction />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
