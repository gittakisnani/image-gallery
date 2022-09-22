import { NextPage } from 'next'
import { useEffect, useState} from 'react'
import CreatorPage from '../components/CreatorPage'
import Footer from '../components/Footer'
import Header from '../components/Header'
const Creator: NextPage = () => {
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
          <main className=''>
          {showHeader && <Header bg='bg-white' searchBar className=' fixed top-0 left-0 right-0 z-50'  />}
             <CreatorPage />
            {/*<PicturePage /> */}
          </main>
          <Footer />
        </>
      )
}

export default Creator