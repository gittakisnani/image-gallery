import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BsBookmarks, BsBookmarksFill, AiFillHeart, AiOutlineHeart, BsDownload} from './Icons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from '../utils/axios'
import { Creator } from './CreatorPage'
import { ModalProps } from '../types/types'
import { User } from '../pages/edit-profile'


interface PictureProps {
  image: string
  _id: string
  user?: string
  me: User | null
}


const Picture = ({ setIsOpen, setText, image, _id, user, me }: ModalProps & PictureProps) => {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false);
  const [creator, setCreator] = useState<Creator | null>(null);
  const router = useRouter();

  
  const handleLike = async () => {
    if(!me?._id) return router.push('/signin')
    setLiked(!liked);
    try {
      await axios.put(`like/${me?._id}/${_id}`)
      setIsOpen!(true);
      setText!(`Picture ${!liked ? 'added to' : 'removed from'} your collection`)
    } catch(err) {
      console.error(err)
    }
  }

  const handleDownload = () => {
    setIsOpen!(true);
    setText!('Picture successfully downloaded')
  }

  const handleBookmark = async () => {
    if(!me?._id) return router.push('/signin')
    setBookmarked(!bookmarked)
    try {
      await axios.put(`collect/${_id}`)
      setIsOpen!(true);
      setText!(`Picture ${!bookmarked ? 'added to' : 'removed from'} your collection`)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    async function findUser() {
      try {
        const{ data: creatorData } = await axios.get<Creator | null>(`users/${user!}`);
        setCreator(creatorData!);

        if(me) {
          setLiked(me.my_likes.includes(_id))
          setBookmarked(me.my_bookmarks.includes(_id))
        }
      } catch(err) {
        console.error(err)
      }
    }

    findUser()

  }, [_id, me, user]);


  const checkQuery = Boolean(router.query.creator)

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
            <Link href={`${router.pathname}?creator=${user}?photos`} as={`/creator/${user}?photos`}>
              <a className='h-10 w-10 rounded-full overflow-hidden'>
                <Image src={creator?.picture!} alt='Image' width="40px" height="40px" />
              </a>
            </Link>
            <h5 className='name text-lg font-semibold text-white'>{creator?.firstName} {creator?.lastName}</h5>
          </div>
          {/* Download */}
          <button onClick={handleDownload} className='act-button h-10 w-10 flex justify-center items-center bg-gray-50 action-button text-xl rounded-md opacity-0 group-hover:opacity-100 transitions'>
            <BsDownload />
          </button>
        </div>
      <Link href={`${router.pathname}?picture=${_id}`} as={`/pictures/${_id}`}>
        <a>
        <Image src={image!} alt='Image' height="600px" width="500px" />
        </a>
      </Link>
      </div>
    </>
  )
}

export default Picture