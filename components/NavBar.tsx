import Link from "next/link"
import { useState } from "react"
import useWindowSize from "../hooks/useWindowSize"
import Languages from "./Languages"
import { AiOutlineClose} from './Icons'
import { User } from "../pages/edit-profile"
import Image from "next/image"
import UserMenu from "./UserMenu"
//Navbar contains 
/*
  when the user is authenticated?
  -- User Picture, When we hover we find: Profile, Settings, Liked pictures, collected pictures.
  -- Explore Button, Upload Button, Change language.

  When the user is not authenticated?
  -- Login and Join buttons
  -- Explore and change language.
*/
const NavBar = ({ setNavBar, user } : { setNavBar: (value: boolean) => void, user: User}) => {
  const { width } = useWindowSize()
  const [languages, setLanguages] = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  return (
    <nav className="fixed inset-0 z-[1000] md:static p-6 md:p-0 bg-black md:bg-transparent text-white md:text-black flex flex-col gap-2 md:flex-row md:items-center">
      {width! < 768 && <div className="mb-4 flex justify-end items-center">
            <button onClick={() => setNavBar(false)} className="text-2xl" title="close">
              <AiOutlineClose />
            </button>
        </div>}
      <Link href="/#explore">
        <a>Explore</a>
      </Link>
      <div className="md:relative w-fit">
      <button onClick={() => setLanguages(!languages)}>Language</button>
      {languages && <Languages setLanguages={setLanguages} />}
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        {!user?._id && <Link href="/signin">
        <a className="bg-transparent p-2 rounded-md border border-transparent md:hover:border-gray-200 transitions">
          Login
        </a>
        </Link>}
        {!user?._id && <Link href="/register">
        <a className="bg-green-500 p-2 text-white font-semibold rounded-md border border-transparent hover:border-green-500 transitions">
          Join
        </a>
        </Link>}
        <Link href='/upload'>
        <a className="bg-green-500 p-2 text-white font-semibold rounded-md border border-transparent hover:border-green-500 transitions flex items-center justify-center md:self-center">
          Upload
        </a>
        </Link>
        {user?._id && <button onClick={() => setUserMenu(!userMenu)} className="bg-transparent p-2 rounded-md border border-transparent md:hover:border-gray-200 transitions md:relative">
          <div className="flex gap-2 items-center">
            <div className="w-[35px] h-[35px] rounded-full overflow-hidden bg-red-300">
              <Image src={user.picture} alt="Settings" width={'35px'} height={'35px'} />
            </div>
            <p>{user.firstName} {user.lastName}</p>
          </div>
          {userMenu && <UserMenu userId={user._id} />}
        </button>}
      </div>
    </nav>
  )
}

export default NavBar