import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import ImagesSection from '../components/ImagesSection'
import SearchSection from '../components/SearchSection'
import Footer from '../components/Footer'
import Modal from '../components/Modal'

const Home: NextPage = () => {
  const [showHeader, setShowHeader] = useState(typeof window !== "undefined" && window.screenY > 500)
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
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
    <Head>
      <title>Homepage</title>
      <meta name="description" content="Home page of TakiSnani Image gallery to see hundreds of pictures for free." />
    </Head>
      {showHeader && <Header bg='bg-white' searchBar className=' fixed top-0 left-0 right-0 z-50'  />}
      <main className=''>
        <Modal setIsOpen={setIsOpen} isOpen={isOpen} text={text} />
        <SearchSection />
        <ImagesSection setIsOpen={setIsOpen} isOpen={isOpen} text={text} setText={setText} />
      </main>
      <Footer />
    </>
  )
}


export default Home
