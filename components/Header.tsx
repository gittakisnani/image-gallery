import { HeaderProps } from '../types/types'
import Container from './Container'
import Logo from './Logo'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import { AiOutlineMenu } from './Icons'
import useWindowSize from '../hooks/useWindowSize'
import { useEffect, useState } from 'react'

const Header = ({ bg = "bg-transparent", searchBar = true, className }: HeaderProps) => {
  const { width } = useWindowSize();
  const [navBar, setNavBar] = useState(true)

  useEffect(() => {
    if(width! < 768 ) setNavBar(false)
  }, [width])

  return (
    <header className={`${bg} ${className}`}>
        <Container className='flex items-center justify-between p-4 md:px-6'>
          <Logo />
          { searchBar && width! > 440 && <div className='flex-1 px-4'>
            <SearchBar />
          </div>}
          { (width! >= 768 || width! < 768 && navBar) && <NavBar setNavBar={setNavBar} /> }
          { width! < 768 && !navBar && <button className='text-2xl' onClick={() => setNavBar(true)}><AiOutlineMenu /></button>}
        </Container>
    </header>
  )
}

export default Header