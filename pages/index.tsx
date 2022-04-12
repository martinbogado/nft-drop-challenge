import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';

import { sanityClient } from '../sanity';
import { Collection } from '../typings';

import ChangeTheme from '../src/components/ChangeTheme/ChangeTheme';
import LandingPage from '../src/components/LandingPage/LandingPage';
import CollectionInfo from '../src/components/CollectionInfo/CollectionInfo';

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
      <LandingPage />      
      
      {/* Main content */}
      <main className=' p-10 shadow-xl shadow-yellow-400/40 dark:shadow-yellow-400/20 mb-10 bg-gradient-to-tr from-purple-300/[0.75] dark:from-purple-500/[0.10]'>
        <section className="pb-12 lg:pb-16">
          <h1 className="text-center text-3xl font-extralight md:text-left  md:text-4xl">
            Explore the <span className="font-bold text-yellow-500">collections</span>
          </h1>
        </section>

        <div className='grid space-x-3 space-y-8 md:space-y-0 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          { collections.map( collection => (
            <CollectionInfo collection={collection} key={collection._id}/> 
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
