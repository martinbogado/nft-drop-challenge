import Link from 'next/link';
import { useDisconnect, useMetamask } from "@thirdweb-dev/react";

interface Props {
    address: string | undefined,
    modalOn: boolean
}

const Header = ({ address, modalOn }: Props) => {

    // Auth
    const disconnect = useDisconnect();
    const connectWithMetamask = useMetamask();
    //----
    
    return(
        <header className='flex items-center justify-between lg:mr-16'>
            <Link href={'/'}>

                <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80 lg:flex lg:space-x-2'>
                    The{' '}
                    <span className='font-extrabold underline decoration-pink-600/50 lg:ml-1 lg:mr-1'>
                        PAPAFAM 
                    </span>{' '}
                    NFT Market Place
                    <span className="group hidden lg:block mt-1 cursor-auto">
                        { !modalOn && (
                            <>
                                <img className='dark:invert' src="/static/images/information.png" alt="info" /> 
                                <span className=" bg-gray-400 dark:bg-gray-300 text-black font-bold text-base p-3 mt-2 -ml-[14%] rounded max-w-[30vw] hidden group-hover:block absolute text-center py-2 px-6 z-50">
                                    These are NOT the original tokens, they are copies from the original collection. The original NFT retains all its value, while this copy has none. They're not meant to generate any profit, only for learning purposes.
                                </span> 
                            </>
                        )}                   
                    </span>
                </h1>

            </Link>
            
            <button onClick={() => address ? disconnect() : connectWithMetamask()}
             className='rounded-full bg-rose-400 dark:bg-purple-700 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base'
            >
                { address ? 'Sign Out' : 'Sign In'}
            </button>
        </header>   
    )
}

export default Header