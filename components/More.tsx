import Link from 'next/link'
import React from 'react'
import Picture from './Picture'

const More = () => {
  return (
    <div>
        <h3 className='text-xl md:text-2xl lg:text-3xl text-slate-900 font-semibold mt-6 mb-10'>More like this</h3>
        <div className='flex gap-2 items-center'>
            {Array(10).fill('Beach').map(( more, index ) => (
                <Link key={index} href={`/search/${more}`}>
                    <a className='more'>{more}</a>
                </Link>
            ))}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6'>
            <div className='flex flex-col gap-6'>
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
            </div>
            <div className='flex flex-col gap-6'>
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
            </div>
            <div className='flex flex-col gap-6'>
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
                <Picture />
            </div>
        </div>
    </div>
  )
}

export default More