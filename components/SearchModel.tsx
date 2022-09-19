import React from 'react'
import RecentSearch from './RecentSearch'
import trendTopics from '../config/trends'
import TrendTopic from './TrendTopic'
const SearchModel = () => {
  return (
    <div className='absolute top-[100%] my-4 bg-white left-0 right-0 rounded-md shadow-2xl z-30 p-4 md:p-6 max-h-[400px] overflow-y-auto'>
        <div className='flex items-center justify-between'>
            <h4 className='font-semibold text-xl md:text-2xl'>
                Recent Searches
            </h4>
            <button className='transitions hover:underline underline-offset-2'>Clear</button>
        </div>
        <div className='my-4 flex flex-wrap gap-2 items-center'>
            {Array(10).fill('Beach').map((search, index) => (
                <RecentSearch key={index} text={search} />
            ))}
        </div>
        <h4 className='font-semibold text-lg md:text-xl'>
            Trending Searches
            <div className='my-4 flex flex-wrap gap-2 items-center'>
                {trendTopics.map(({ text, image }, index) => (
                    <TrendTopic key={index} text={text} image={image} />
                ))}
            </div>
        </h4>
    </div>
  )
}

export default SearchModel