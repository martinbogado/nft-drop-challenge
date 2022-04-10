import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import ChangeTheme from '../src/components/ChangeTheme/ChangeTheme';

import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {



  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen pt-20 px-10 2xl:px-0 lg:py-0 overflow-hidden">
      <Head>
        <title>NFT Drop Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Light or Dark mode buttton */}
      <ChangeTheme />

      {/* Header */}
      <h1 className='text-3xl lg:text-4xl font-extralight text-center lg:text-left lg:absolute lg:top-10'>
        The{' '}
        <span className='font-extrabold underline decoration-yellow-600/50'>
            PAPAFAM 
        </span>{' '}
        NFT Market Place
      </h1>

      {/* Landing */}
      <div className='grid grid-rows-2 justify-between h-[90vh] lg:h-screen lg:grid-cols-2 md:grid-cols-2 box-border'>
        <div className="col-span-2 md:col-span-1 lg:row-span-2 mb-12 mt-8 sm:mt-16 flex flex-col space-y-6 text-center md:mb-0 md:text-left md:justify-center md:space-y-2">
          
          <h1 className=" text-3xl font-extralight dark:text-white  md:max-w-md md:text-6xl lg:font-bold">
            Discover and collect rare <span className="font-bold text-yellow-600">NFTs</span>
          </h1>
        </div>
          <div className='md:col-span-1 md:row-span-2 md:relative'>
            <div className='absolute md:top-1/2 lg:top-1/2 w-max lg:hover:-translate-y-[220px] transition duration-300 -translate-y-[180px] translate-x-[200px] sm:-translate-y-[180px] sm:translate-x-[350px] md:translate-x-[220px] lg:-translate-y-[200px] lg:translate-x-[300px]'>
              <div className=' w-32 sm:w-48 card transition rounded-sm lg:w-72 '>
                
                  <img src="static/images/monkey.png" alt="kong" />
                
              </div> 
            </div>
            <div className='absolute md:top-1/2 lg:top-1/2 w-max lg:hover:-translate-y-[120px] transition duration-300 -translate-y-[80px] translate-x-[100px] sm:-translate-y-[80px] sm:translate-x-[180px] md:translate-x-[120px] lg:-translate-y-[100px] lg:translate-x-[160px]'>
              <div className=' w-32 sm:w-48 card transition rounded-sm lg:w-72'>
                
                  <img src="static/images/avatar.png" alt="avatar" />
                
              </div> 
            </div>
            <div className='absolute md:top-1/2 lg:top-1/2 w-max lg:hover:-translate-y-3 transition duration-300'>
              <div className=' w-32 sm:w-48 card transition rounded-sm lg:w-72'>
                
                  <img src="static/images/azuki.png" alt="azuki" />
                
              </div> 
            </div>
          </div>

      </div>
      
      
      {/* Main content */}
      <main className=' p-10 shadow-xl shadow-yellow-400/20 mb-10 to-blue-400[0.35] dark:to-blue-400[0.25] bg-gradient-to-tr from-purple-300/[0.75] dark:from-purple-500/[0.10]'>
        <section className="pb-12 lg:pb-16">
          <h1 className="text-center text-3xl font-extralight md:text-left  md:text-4xl">
            Explore the <span className="font-bold text-yellow-500">collections</span>
          </h1>
        </section>
        <div className='grid space-x-3 space-y-8 md:space-y-0 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          { collections.map( collection => (
            <Link href={`/nft/${collection.slug.current}`} key={collection._id}>
              <div className='flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105'>
                <img className='h-96 w-60 rounded-2xl object-cover' src={urlFor(collection.mainImage).url()} alt="" />

                <div className='p-5'>
                  <h2 className='text-2xl sm:text-3xl text-center md:text-left'>{collection.title}</h2>
                  <p className='mt-2 text-sm text-center md:text-left text-gray-600 dark:text-gray-400'>{collection.description}</p>
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
