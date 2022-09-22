import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import ImagesSection from '../components/ImagesSection'
import SearchSection from '../components/SearchSection'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  const [showHeader, setShowHeader] = useState(typeof window !== "undefined" && window.screenY > 500)


useEffect(() => {
    if(typeof window !== "undefined"){
      const handleScroll = () => {
        setShowHeader(prev => window.scrollY > 500)
      }

      handleScroll()

      window.addEventListener('scroll', handleScroll)


      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    } else {
      console.log('error')
    }
}, [])


  return (
    <>
      {showHeader && <Header bg='bg-white' searchBar className=' fixed top-0 left-0 right-0 z-50'  />}
      <main className=''>
        <SearchSection />
         <ImagesSection />
      </main>
      <Footer />
    </>
  )
}

export default Home
