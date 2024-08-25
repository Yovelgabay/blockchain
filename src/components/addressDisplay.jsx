import { useRef,useState } from "preact/hooks"
//import { showPopup } from '../utils/utils'

export default function AddressDisplay({address,symbol}) {
    const divRef = useRef(null)
    const [copy,setCopy] = useState('')

    const copyText = () => {
        console.log(copy)
        const textToCopy = divRef.current.innerText
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopy("Address copied to clipboard")
                setTimeout(() =>{
                    setCopy('')
                }, 1500);
            })
            .catch(err => console.error('Failed to copy text: ', err))
    }

    return (
        <>
            <div class={"text-md text-gray-400 mb-0 pb-1"}>My <span class="font-bold text-gray-800">{symbol}</span> address:</div>
            <div ref={divRef} onClick={copyText} class="relative border border-gray-400 rounded-md py-2 pl-2 pr-12 hover:bg-gray-200 cursor-pointer truncate" title="click to copy">
                {address}
                <button class="absolute top-2 right-2 bg-transparent  rounded p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 448 512" stroke="currentColor" class="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z" />
                    </svg>
                </button>
            </div>
            <div id="popup" style = {{height:"25px"}} >{copy}</div>
        </>
    )
}