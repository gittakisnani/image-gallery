import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState} from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PicturePage from '../components/PicturePage'

const Picture: NextPage = () => {
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
        <Head>
          <title>Picture Page</title>
          <meta name="description" content="Picture page where you can like, collect or download your fav pics, Also you can see related pics, related topics" />
        </Head>
          {showHeader && <Header bg='bg-white' searchBar className=' fixed top-0 left-0 right-0 z-50'  />}
            <PicturePage />
            <Footer />
        </>
      )
}

export default Picture