import { NFTMetadataOwner } from "@thirdweb-dev/sdk"

interface Props {
    nft: NFTMetadataOwner
    setModalOn: Function
}

function Modal({nft, setModalOn}:Props){

    return(
        <div onClick={() => setModalOn(false)} className='fixed inset-0 bg-gray-500 bg-opacity-80 flex items-center justify-center'>
            <div className='flex flex-col bg-white shadow-2xl rounded-lg border-2 border-gray-400 p-4 lg:p-6 z-10'>
                    <div className='block m-auto rounded-xl bg-gradient-to-br from-yellow-400 to-cyan-600 p-1 max-w-max'>
                    <img 
                        className='relative w-44 rounded-xl object-cover lg:h-80 lg:w-64'
                        src={nft.metadata.image} 
                        alt="Minted NFT!" 
                    />   
                    </div>   
                <div className="text-left p-2 pt-4 space-y-1">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {nft.metadata.description + ' ' + nft.metadata.name}
                    </h1>
                    <h2 className="text-base font-bold text-gray-600">
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