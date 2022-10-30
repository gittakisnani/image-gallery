import Link from 'next/link'
import React from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import { BsThreeDots } from './Icons'
import Container from './Container'
import { User } from '../pages/edit-profile'
const SearchSection = ({ user }: { user: User }) => {
  return (
    <div className='h-[500px] p-4 relative flex flex-col'>
        <Header user={user} searchBar={false}  />
        <div className='absolute z-[-1] inset-0'>
            <img src='https://images.pexels.com/photos/9420591/pexels-photo-9420591.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' className='w-full h-full bg-cover' />
        </div>
        <Container className='h-full flex items-center justify-center flex-1'>
            <div>
                <div className='max-w-[600px]'>
                    <h1 className='text-2xl md:text-[1.8rem] text-white font-bold'>
                    The best free stock photos, royalty free images & videos shared by creators.
                    </h1>
                    <div className='my-4'>
                        <SearchBar bg='bg-white' />
                    </div>
                    <p className='tending'><span className='text-gray-300 font-bold'>Trending: </span>
                    <div className='inline-flex items-center gap-1'>
                    {['nature', 'space', 'dark', 'mountains'].map((trend, index) => (
                        <Link href={`/search/trend`} key={index}>
                            <a className='font-semibold  text-white hover:text-gray-200 transitions'>
                                {trend}{index < 3 ? "," : ""}
                            </a>
                        </Link>
                    ))}
                    <Link href={'/popular-searches'}>
                        <a className='p-1 rounded-full bg-gray-100/20 hover:bg-gray-100/50 transitions text-white'><BsThreeDots /></a>
                    </Link>
                    </div>
                    </p>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default SearchSection