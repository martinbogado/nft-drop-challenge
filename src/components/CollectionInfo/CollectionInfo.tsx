import Link from "next/link";
import {  urlFor } from '../../../sanity';
import { Collection } from '../../../typings'

interface Props {
    collection: Collection
}

const CollectionInfo = ({ collection }: Props) => {
    return (
        <Link href={`/nft/${collection.slug.current}`}>
            <div className='flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105'>
                <img className='h-96 w-60 rounded-2xl object-cover' src={urlFor(collection.mainImage).url()} alt="collection poster" />

                <div className='p-5'>
                    <h2 className='text-2xl sm:text-3xl text-center md:text-left'>{collection.title}</h2>
                    <p className='mt-2 text-sm text-center md:text-left text-gray-600 dark:text-gray-400'>{collection.description}</p>
                </div>
            </div>
        </Link>   
    )
}

export default CollectionInfo