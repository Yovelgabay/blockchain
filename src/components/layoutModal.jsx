import { createPortal } from 'preact/compat'

export default function LayoutModal({ children, close }) {
    return createPortal(
        <div className="fixed z-[1000] inset-0 overflow-y-auto flex items-start justify-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={close}></div>
            <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all mt-[10%] w-full max-w-[380px] sm:w-[380px]">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={close}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}


