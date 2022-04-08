import React, { useEffect, useState } from 'react';
import { useAddress, useDisconnect, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings';
import Link from 'next/link'
import { BigNumber } from 'ethers';
import toast, { Toaster } from 'react-hot-toast'
import Modal from '../../src/components/Modal/Modal'
import { NFTMetadata, NFTMetadataOwner } from '@thirdweb-dev/sdk';
import ChangeTheme from '../../src/components/ChangeTheme/ChangeTheme'

interface Props {
    collection: Collection
}

function NFTDropPage({ collection }: Props ) {

    const [ claimedSupply, setClaimedSupply] = useState<number>(0);
    const [ totalSupply, setTotalSupply ] = useState<BigNumber>();
    const [ priceInEth, setPriceInEth ] = useState<string>();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ mintedNFT, setMintedNFT ] = useState<NFTMetadataOwner>();
    const [ modalOn, setModalOn ] = useState<boolean>(false);

    const nftDrop = useNFTDrop(collection.address)

    // Auth
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();
    //----
     
    useEffect(() => {
        if (!nftDrop) return;
        
        const fetchPrice = async() => {
            const claimedConditions = await nftDrop.claimConditions.getAll();

            setPriceInEth(claimedConditions?.[0].currencyMetadata.displayValue)
        }

        const fetchNFTDropData = async () => {
            setLoading(true);

            const claimed = await nftDrop.getAllClaimed();
            const total = await nftDrop.totalSupply();
            // const unclaimed = await nftDrop.getAllUnclaimed();

            setClaimedSupply(claimed.length);
            setTotalSupply(total);

            setLoading(false);
        }

        !priceInEth && fetchPrice();
        fetchNFTDropData();
    },[nftDrop, mintedNFT])

    const mintNft = () => {
        if(!nftDrop || !address) return;

        setLoading(true);

        const notification = toast.loading('Minting...', {
            style: {
                background: 'white',
                color: 'green',
                fontWeight: 'bolder',
                fontSize: '17px',
                padding: '20px',
            }
        })

        const quantity = 1; // How many unique NFTs you want to claim

        nftDrop.claimTo(address, quantity)
        .then(async tx => {
        //    const receipt = tx[0].receipt // the transaction receip
        //    const claimedTokenId = tx[0].id // id of the NFT claimed

           const claimedNFT = await tx[0].data() // Get the claimed NFT metadata

           toast('Succesfully Minted! Congratulations on your new NFT', {
               icon:  '🏆',
               duration: 6000,
               style: {
                background: 'green',
                color: 'white',
                fontWeight: 'bolder',
                fontSize: '17px',
                padding: '20px',
            }
           })

           setMintedNFT(claimedNFT)
           setModalOn(true)
        })
        .catch( err => {
            console.log(err);
            toast('Whoops... Something went wrong!', {
                style: {
                 background: 'red',
                 color: 'white',
                 fontWeight: 'bolder',
                 fontSize: '17px',
                 padding: '20px',
             }
            })
        })
        .finally(() => {
            setLoading(false);
            toast.dismiss(notification) 
        })
    }

  return (
    <div className='flex lg:h-screen flex-col lg:grid lg:grid-cols-10'>

        { !modalOn && <ChangeTheme />}
        {/* Modal for NFT purchased */}

        { (mintedNFT && modalOn) && <Modal nft={mintedNFT} setModalOn={setModalOn}/> }
        
        <Toaster position='bottom-center'/>
        
        {/* Left */}
        <div className='lg:col-span-4 bg-gradient-to-br bg-300 from-cyan-500 via-purple-500 to-pink-500 animate-move'>
            <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
                <div className='rounded-xl bg-gradient-to-br from-yellow-400 to-cyan-600 p-1'>
                    <img 
                        className='w-44 rounded-xl object-cover lg:h-96 lg:w-72'
                        src={urlFor(collection.previewImage).url()} 
                        alt="" 
                    />
                </div>
                
                <div className='text-center p-5 space-y-2'>
                    <h1 className='text-3xl font-bold text-white'>
                        {collection.nftCollectionName}
                    </h1>
                    <h2 className='text-xl text-gray-300'>
                        {collection.description}
                    </h2>
                </div>    
            </div> 
        </div>

        {/* Right */}
        <div className='flex flex-1 flex-col p-12 lg:col-span-6 to-blue-400[0.35] dark:to-blue-400[0.25] bg-gradient-to-tr from-purple-200/[0.95] dark:from-purple-500/[0.10]'>

            {/* Header */}
            <header className='flex items-center justify-between lg:mr-16'>
                <Link href={'/'}>
                    <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>
                        The{' '}
                        <span className='font-extrabold underline decoration-pink-600/50'>
                            PAPAFAM 
                        </span>{' '}
                        NFT Market Place
                    </h1>
                </Link>
                
                <button onClick={() => address ? disconnect() : connectWithMetamask()}
                 className='rounded-full bg-rose-400 dark:bg-purple-700 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base'>
                   { address ? 'Sign Out' : 'Sign In'}
                </button>
            </header>

            <hr className='my-2 border'/>

            {
                address && (
                    <p className='text-center text-sm text-rose-400'>
                        You're logged in with wallet {address.substring(0,5)}...{address.substring(address.length - 5)}</p>
                )
            }
            {
             (!address && !loading) && (
                <p className='text-center text-xl text-rose-600 animate-pulse'>
                    First, connect your wallet to get started.. </p>
             )   
            }

            {/* Content */}
            <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0 lg:justify-center'>
                <img 
                 className='w-80 object-cover pb-10 lg:h-40'
                 src={urlFor(collection.mainImage).url()} 
                 alt="" 
                />
                <h1 className='text-3xl font-bold lg:text-4xl lg:font-extrabold'>{collection.title}</h1>

                {
                  loading ? 
                    <p className='pt-2 text-xl text-green-500 animate-pulse'>Loading Supply Count... </p>
                  :
                    <p className='pt-2 text-xl text-green-500'>{claimedSupply} / {totalSupply?.toString()} NFT's claimed</p>
                }

                {
                    loading && (
                        <>
                            <img className='h-16 w-72 object-cover dark:hidden' src="https://static.wixstatic.com/media/06cc57_1e3989db030d456190c9042a479a9fd6~mv2.gif" alt="loading" />
                            <img className='h-16 w-20 object-cover hidden dark:block' src="https://i.pinimg.com/originals/58/4b/60/584b607f5c2ff075429dc0e7b8d142ef.gif" alt="loading" />
                        </>
                        
                    )
                }
                           
            </div>
            {/* Mint Button */}
            
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
            
        </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const query = `*[_type == "collection" && slug.current == $id] [0]{
        _id,
        title,
        address,
        description,
        nftCollectionName,
        mainImage{
        asset
        },
        previewImage{
          asset
         },
      slug{
        current
      },
      creator->{
        _id,
        name,
        address,
        slug{
        current
      },
      },
        }`

    const collection = await sanityClient.fetch(query, {
       id: params?.id 
    })

    if (!collection) {
        return {
            notFound: true
        }
    }
    
    return {
        props: {
            collection
        },
    }
}