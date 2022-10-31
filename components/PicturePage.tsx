import { useState, useEffect } from 'react'
import Image from 'next/image'
import useWindowSize from '../hooks/useWindowSize'
import Container from './Container'
import { BsBookmarks, BsBookmarksFill, AiFillHeart, AiOutlineHeart, AiOutlineCheck, FaMapMarkerAlt, AiFillCheckCircle, BsFillInfoCircleFill, GrShare, FiUserPlus, RiUserUnfollowLine} from './Icons'
import More from './More'
import Share from './Share'
import { PictureInterface } from './ImagesSection'
import { useRouter } from 'next/router'
import axios from '../utils/axios'
import { Creator } from './CreatorPage'
import Link from 'next/link'
import { ModalProps } from '../types/types'
import { User } from '../pages/edit-profile'
const PicturePage = ({ picture, setIsOpen, setText, isOpen }: { picture?: PictureInterface } & ModalProps) => {
  const [share, setShare] = useState(false)
  const [image, setImage] = useState<PictureInterface | null>(picture!);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false)
  const [user, setUser] = useState<Creator>()
  const [me, setMe] = useState<User | null>(null)
  const { width } = useWindowSize();
  const router = useRouter();


  const handleLike = async () => {
    if(!me?._id) return router.push('/signin')
    setLiked(!liked);
    try {
      await axios.put(`like/${me?._id}/${image?._id}`)
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
      await axios.put(`collect/${image?._id}`)
      setIsOpen!(true);
      setText!(`Picture ${!bookmarked ? 'added to' : 'removed from'} your collection`)
    } catch(err) {
      console.error(err)
    }
  }

  const requireFetch = !image || (image._id !== (router.query.picture ?? router.query.pictureId))

  useEffect(() => {
    async function findPicture() {
      try {
        if(requireFetch) {
          const { data } = await axios.get<PictureInterface | null>(`pictures/${router.query.picture || router.query.pictureId}`)
          setImage(data)
        }

        //Fetch user

        const { data: userData } = await axios.get<Creator | null>(`users/${image?.user}`) 
        setUser(userData!)

        //fetch me
        const { data: meData }= await axios.get<User | null>('me');
        setMe(meData)
        setLiked(me?.my_likes.includes(image?._id!) || false)
        setBookmarked(me?.my_bookmarks.includes(image?._id!) || false)
      } catch(err) {
        console.error(err)
      }
    }


    findPicture()

  }, [image, me?.my_bookmarks, me?.my_likes, requireFetch, router.query.picture, router.query.pictureId]);



  const handleFollow = async () => {
    if(!me?._id) return router.push('/signin') 
    try {
      await axios.put(`follow/${user?._id}/${me._id}`)
    } catch (error) {
      console.error(error)
    }
  }


  const checkFollow = me?.following.includes(user?._id!) && user?.followers.includes(me._id)

  return (
    <main className='bg-white'>
      <Share link={image?.image || ''} username={image?.user || ''} share={share} setShare={setShare} />
      <Container className='p-4 md:p-6'>
        <div className='flex justify-between items-center '>
          {width! >= 768 && <div className='flex gap-2 items-center'>
            <Link href={`/?creator=${user?._id}?photos`} as={`creator/${user?._id}?photos`}>
              <a className='h-12 w-12 rounded-full overflow-hidden'>
                <Image src={user?.picture!} alt='User' width='50px' height='50px' />
              </a>
            </Link>
            <div className='flex flex-col text-lg'>
              <h3 className='text-black font-bold'>{user?.firstName} {user?.lastName}</h3>
              {me?._id !== user?._id && <p onClick={handleFollow} className='text-gray-500 font-semibold cursor-pointer'>
                {checkFollow
                ? 'Unfollow'
                : 'Follow'
                }
              </p>}
            </div>
          </div>}
            <div className='flex gap-2 items-center flex-1 justify-end'>
              <button onClick={handleBookmark} className='action-button flex self-stretch gap-2 items-center border border-gray-200 hover:border-gray-300 text-lg p-2 rounded-md font-semibold'>
                <span>{bookmarked ? <BsBookmarksFill /> : <BsBookmarks />}</span>
                <p className='hidden md:block'>{bookmarked ? 'Unbookmark' : 'bookmark'}</p>
              </button>
              <button onClick={handleLike} className='action-button flex self-stretch gap-2 items-center border border-gray-200 hover:border-gray-300 text-lg p-2 rounded-md font-semibold'>
                <span>{liked ? <AiFillHeart color='red' /> : <AiOutlineHeart />}</span>
                <p className='hidden md:block'>{liked ? 'Unlike' : 'Like'} {image?.likes.length}</p>
              </button>
              <button onClick={handleDownload} className='text-white bg-green-600 font-semibold text-lg p-2 px-4 rounded-md'>
                Download {image?.downloads}
              </button>
            </div>  
        </div>
        <div className='mx-auto w-fit max-w-[500px] h-[650px] my-10'>
          <Image src={image?.image!} alt='Image' width='400px' height="650px" />
        </div>
        <div className='flex gap-2 justify-between items-center'>
          <div className='flex items-center gap-2'>
            {image?.free && <div className='flex gap-1 text-gray-500'>
              <span className='text-xl'><AiFillCheckCircle /></span>
              <p className='font-semibold'>Free to use</p>
            </div>}
            {image?.location && <div className='flex gap-1 text-gray-500'>
              <span className='text-xl'><FaMapMarkerAlt /></span>
              <p className='font-semibold'>{image.location}</p>
            </div>}
          </div>
          <div className='flex items-center gap-2'>
                <button className='action-button flex items-center gap-2 border border-gray-200 hover:border-gray-300 text-lg p-2 rounded-md font-semibold'>
                  <span><BsFillInfoCircleFill /></span>
                  <p className='hidden md:block'>More info</p>
                </button>
                <button onClick={() => setShare(true)} className='action-button flex items-center gap-2 border border-gray-200 hover:border-gray-300 text-lg p-2 rounded-md font-semibold'>
                  <span><GrShare /></span>
                  <p className='hidden md:block'>Share</p>
                </button>
          </div>
        </div>
        { width! < 768 && <div className='my-6 flex justify-between items-center'>
            <Link href={`/?creator=${user?._id}?photos`} as={`creator/${user?._id}?photos`}>
              <a className='flex gap-2 items-center'>
                    <div className='h-12 w-12 rounded-full overflow-hidden'>
                      <Image src={user?.picture!} alt='User' width='50px' height='50px' />
                    </div>
                    <h3 className='text-black font-bold'>{user?.firstName} {user?.lastName}</h3>
              </a>
            </Link>
            <button className='action-button flex self-stretch gap-2 items-center border border-gray-200 hover:border-gray-300 text-xl p-2 rounded-md'>
              {checkFollow ? <RiUserUnfollowLine /> : <FiUserPlus />}
            </button>
        </div>}
        {user?._id && image?._id && <More me={me} setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} user={user._id} filter={image._id} />}
      </Container>
    </main>
  )
}

export default PicturePage

