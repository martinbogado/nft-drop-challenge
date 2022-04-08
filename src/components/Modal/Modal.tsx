import { NFTMetadataOwner } from "@thirdweb-dev/sdk"
import { useEffect } from "react";

interface Props {
    nft: NFTMetadataOwner
    setModalOn: Function
}

function Modal({nft, setModalOn}:Props){

    function timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        timeout(30000).then(() => setModalOn(false))
    },[])


    return(
        <div onClick={() => setModalOn(false)} className='fixed inset-0 bg-gray-500 bg-opacity-80 flex items-center justify-center overflow-y-hidden'>
            <div className='flex flex-col shadow-2xl rounded-lg border-2 border-gray-400 dark:border-purple-800 p-4 lg:p-6 z-10 dark:bg-black bg-white animate-slideDown delay-1000'>
                    <div className='block m-auto p-1 max-w-max'>                    
                     <div className="group relative">
                        <div className="group-hover:duration-600 absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
                                 
                            <div className='rounded-xl bg-gradient-to-br from-purple-500 to-cyan-600 p-1'>
                                <img 
                                className='relative w-44 rounded-xl object-cover lg:h-80 lg:w-64'
                                src={nft.metadata.image} 
                                alt="Minted NFT!" 
                                />
                            </div>
                        
                     </div>   
                    </div>   
                <div className="text-left p-2 pt-4 space-y-1">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {nft.metadata.description + ' ' + nft.metadata.name}
                    </h1>
                    <h2 className="text-base font-bold text-gray-600 dark:text-gray-400">
                        Minted on {new Date().toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"}) }
                    </h2>  
                </div>
                <button 
                 onClick={() => setModalOn(false)}
                 className="bg-green-700 text-white px-4 py-1 font-bold rounded-md block m-auto mt-2 hover:bg-green-900 transition-all duration-200"
                >
                        Continue
                </button>
            </div>
        </div> 
        
    )
}

export default Modal