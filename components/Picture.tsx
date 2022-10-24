import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BsBookmarks, BsBookmarksFill, AiFillHeart, AiOutlineHeart, BsDownload} from './Icons'
import { ModalProps } from './Modal'
import { useRouter } from 'next/router'
import Link from 'next/link'


const Picture = ({ setIsOpen, setText}: Partial< ModalProps & { setText: (value: string) => void}>) => {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const router = useRouter();

  
  const handleLike = () => {
    setLiked(!liked);
    setIsOpen!(true);
    setText!(`Picture ${!liked ? 'added to' : 'removed from'} your collection`)
  }

  const handleDownload = () => {
    setIsOpen!(true);
    setText!('Picture successfully downloaded')
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    setIsOpen!(true);
    setText!(`Picture ${!bookmarked ? 'added to' : 'removed from'} your collection`)
  }

  return (
    <>
      <div className='relative group'>
        <div className='absolute top-0 right-0 left-0 z-10 flex transitions justify-end items-center gap-2 p-2 opacity-0 group-hover:opacity-100'>
          <motion.button onClick={handleBookmark} initial={{scale: 0}} animate={{scale: 1}} className='act-button h-10 w-10 flex justify-center items-center bg-gray-50 action-button text-xl rounded-md'>
            {bookmarked ? <BsBookmarksFill /> : <BsBookmarks />}
          </motion.button>
          <motion.button onClick={handleLike} className='act-button h-10 w-10 flex justify-center items-center bg-gray-50 action-button text-xl rounded-md'>
            {!liked ? <AiOutlineHeart /> : <AiFillHeart color='red' />}
          </motion.button>
        </div>
        <div className='absolute z-10 bottom-0 left-0 right-0 flex justify-between items-center p-2 py-4'>
          {/* Creator */}
          <div className='flex gap-2 items-center'>
            <Link href={`${router.pathname}?creator=2`} as='creator'>
              <a className='h-10 w-10 rounded-full overflow-hidden'>
                <Image src="https://images.pexels.com/users/avatars/139433618/dominika-mazur-209.jpeg?auto=compress&fit=crop&h=40&w=40&dpr=1" alt='Image' width="40px" height="40px" />
              </a>
            </Link>
            <h5 className='name text-lg font-semibold text-white'>John Doe</h5>
          </div>
          {/* Download */}
          <button onClick={handleDownload} className='act-button h-10 w-10 flex justify-center items-center bg-gray-50 action-button text-xl rounded-md opacity-0 group-hover:opacity-100 transitions'>
            <BsDownload />
          </button>
        </div>
      <Link href={`${router.pathname}?picture=2`} as='/picture'>
        <a>
        <Image src='https://images.pexels.com/photos/11719113/pexels-photo-11719113.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='Image' height="600px" width="500px" />
        </a>
      </Link>
      </div>
    </>
  )
}

export default Picture