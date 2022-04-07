import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {



  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen py-20 px-10 2xl:px-0">
      <Head>
        <title>NFT Drop Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <h1 className='mb-10 text-4xl font-extralight'>
        The{' '}
        <span className='font-extrabold underline decoration-pink-600/50'>
            PAPAFAM 
        </span>{' '}
        NFT Market Place
      </h1>

      {/* Landing */}
      <div className='flex flex-col justify-between h-screen lg:grid lg:grid-cols-2'>
        <div>
          Best Nfts
        </div>
        <div className='relative block mt-auto'>
          <div className='absolute bottom-1/4 w-max lg:hover:-translate-y-[220px] transition -translate-y-[180px] translate-x-[220px] lg:-translate-y-[200px] lg:translate-x-[360px]'>
            <div className=' w-48 card transition rounded-sm lg:w-72'>
              
                <img src="/images/punk.png" alt="" />
              
            </div> 
          </div>
          <div className='absolute bottom-1/4 w-max lg:hover:-translate-y-[120px] transition -translate-y-[80px] translate-x-[120px] lg:-translate-y-[100px] lg:translate-x-[160px]'>
            <div className=' w-48 card transition rounded-sm lg:w-72'>
              
                <img src="/images/something.png" alt="" />
              
            </div> 
          </div>
          <div className='absolute bottom-1/4 w-max lg:hover:-translate-y-3 transition'>
            <div className=' w-48 card transition rounded-sm lg:w-72'>
              
                <img src="/images/azuki.png" alt="" />
              
            </div> 
          </div>
        </div>
      </div>
      
      
      {/* Main content */}
      <main className='bg-slate-100 p-10 shadow-xl shadow-rose-400/20'>
        <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          { collections.map( collection => (
            <Link href={`/nft/${collection.slug.current}`} key={collection._id}>
              <div className='flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105'>
                <img className='h-96 w-60 rounded-2xl object-cover' src={urlFor(collection.mainImage).url()} alt="" />

                <div className='p-5'>
                  <h2 className='text-3xl'>{collection.title}</h2>
                  <p className='mt-2 text-sm text-gray-400'>{collection.description}</p>
                </div>
              </div>
            </Link>   
          )) }  
        </div>    
      </main>

    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
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

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    }
  }
}
