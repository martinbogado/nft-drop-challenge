import { BigNumber } from "ethers"

interface Props {
    loading: boolean,
    claimedSupply: number,
    totalSupply: BigNumber | undefined,
    address: string | undefined,
    modalOn: boolean,
    priceInEth: string | undefined,
    mintNft: Function
}

const MintButton = ({ loading, claimedSupply, totalSupply, address, modalOn, priceInEth, mintNft }: Props) => {
    return(
        <button
         onClick={() => mintNft()}
         disabled={ loading || claimedSupply === totalSupply?.toNumber() || !address } 
         className='h-12 w-full rounded-full mt-10 font-bold disabled:cursor-not-allowed dark:bg-black bg-white'
        >
            { !modalOn &&
            <div className="group relative">
                <div className="group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
                <div className="relative space-x-4 divide-gray-600 rounded-full  bg-white p-4 leading-none text-blue-500 transition duration-200 hover:text-purple-500 dark:bg-black dark:text-blue-200 dark:hover:text-purple-300">                     
                {
                    loading ? (
                        <>Loading</>
                    ) : claimedSupply === totalSupply?.toNumber() ? (
                        <>SOLD OUT</>
                    ) : !address ? (
                        <span className='text-pink-600 dark:text-purple-800'>Sign in to Mint</span>
                    ) : (
                        <span className='font-bold'>Mint NFT ({priceInEth} ETH)</span>
                    ) 
                }      
                </div>
            </div> 
            } 
        </button>
    )
}

export default MintButton