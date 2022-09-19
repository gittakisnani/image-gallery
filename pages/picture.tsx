import { NextPage } from 'next'
import { useEffect, useState} from 'react'
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
          {showHeader && <Header bg='bg-white' searchBar className=' fixed top-0 left-0 right-0 z-50'  />}
            <PicturePage />
        </>
      )
}

export default Picture