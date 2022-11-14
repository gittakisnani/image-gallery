import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import { User } from '../pages/edit-profile'
import { ModalProps } from '../types/types'
import axios from '../utils/axios'
import fetcher from '../utils/fetcher'
import AnimatedPicture from './AnimatedPicture'
import Container from './Container'
import FollowUser from './FollowUser'
import { FiUserPlus, MdOutlineLanguage, AiOutlineUp, AiOutlineDown, AiOutlineCheck, MdModeEdit, BiImages, RiUserUnfollowLine } from './Icons'
import { PictureInterface } from './ImagesSection'
import Picture from './Picture'


export interface Creator {
    firstName: string
    lastName: string
    bio: string
    website: string
    twitter: string
    instagram: string
    yt: string
    following: string[]
    followers: string[]
    picture: string
    _id: string
    my_likes: string[]
    my_bookmarks: string[]
}




const CreatorPage = ({creator: user, setIsOpen, setText, isOpen, loggedUser}: { creator?: Creator, loggedUser?: User } & ModalProps) => {
    const router = useRouter()
    const { width } = useWindowSize()
    const [sort, setSort] = useState<'Recency' | 'Popularity'>('Popularity');
    const [showSort, setShowSort] = useState(false)
    const [pictures, setPictures] = useState<PictureInterface[]>([]);
    const [likedAndBookmarked, setLikedAndBookmarked] = useState<PictureInterface[]>([]);
    const [creator, setCreator] = useState<Creator| null>(user || null);
    const [me, setMe] = useState<User | null>(loggedUser || null)
    const handleShowSort = () => setShowSort(!showSort);

    const handleSort = (sortMethod: typeof sort) => {
        setSort(sortMethod);
        setShowSort(false)
    }

    useEffect(() => {
        async function findCreator() {
            try {
                if(!user) {
                    const data = await fetcher<Creator>(`users/${router.query.creator}`);
                    setCreator(data!);
                    const picturesData = await fetcher<PictureInterface[]>(`pictures/${data?._id}/pictures`);
                    setPictures(picturesData!);
                    const likesAndBookmarksData = await fetcher<PictureInterface[]>('user/likes-and-bookmarks');
                    setLikedAndBookmarked(likesAndBookmarksData!) 
                    return 
                }
                const picturesData = await fetcher<PictureInterface[]>(`pictures/${creator?._id}/pictures`);
                setPictures(picturesData!)
                const likesAndBookmarksData = await fetcher<PictureInterface[]>('user/likes-and-bookmarks');
                setLikedAndBookmarked(likesAndBookmarksData!) 
            } catch(err) {
                console.error(err)
            }
        }

        findCreator()

    }, [creator?._id, router.query.creator, user]);

    useEffect(() => {
        if(!me) {
            const findMe = async () => {
                try {
                    const data = await fetcher<User>('me');
                    setMe(data)
                } catch(err) {
                    console.error('error')
                }
            }

            findMe()
        }
    }, [me])

    const handleViewsCount = (pictures: PictureInterface[]): number => {
        return pictures.reduce((acc, current) => {
            return  acc + current.views.length
        }, 0)
    }

    const handleFollow = async () => {
        if(!me) {
            router.push('/signin');
            return
        }

        try {
            await axios.put(`follow/${creator?._id}/${me._id}`)
        } catch(err) {
            console.error(err)
        }
    }



    const checkQuery = Boolean(router.query.creator);
    const sameUser = me?._id === creator?._id;
    const checkFollow = me?.following.includes(creator?._id!) && creator?.followers.includes(me?._id!) 

  return (
    <section className='bg-white'>
        <Container className='px-4 md:px-6 py-10'>
            <div className='flex flex-col items-center'>
            <div className='h-[120px] md:h-[180px] w-[120px] md:w-[180px] rounded-full overflow-hidden border-2 border-green-500'>
                <Image src={creator?.picture!} alt='Creator' width='180px' height="180px" />
            </div>
            <h2 className='text-slate-900 text-2xl md:text-5xl font-semibold my-6'>{creator?.firstName} {creator?.lastName}</h2>
            <div title='Follow John Doe' className='bg-green-600 p-2 rounded-md font-semibold text-lg text-white'>
                {sameUser 
                ? <Link href='/edit-profile'>
                    <a className='flex items-center gap-2'>
                        {width! >= 768 ? <> <MdModeEdit size='25px' />Edit Profile </> : <MdModeEdit />  }
                    </a>
                  </Link>
                :   <button onClick={handleFollow} className='flex items-center gap-2'>
                        {checkFollow
                        ?    <><RiUserUnfollowLine size='25px' /> {width! >= 768 && 'Unfollow'}</>
                        :    <><FiUserPlus size='25px' /> {width! >= 768 && 'Follow'}</>
                        }
                    </button>
                }
            </div>
            <p className='text-center my-6 max-w-[500px]'>{creator?.bio}.</p>
            <div className='flex items-center gap-2'>
                <a href={creator?.website} className='text-gray-500 text-xl' title='Website'>
                    <MdOutlineLanguage />
                </a>
            </div>
            <div className='my-6 flex items-center text-slate-900 text-center gap-10'>
                <div>
                    <p>Total views</p>
                    <p className='text-xl font-semibold'>{handleViewsCount(pictures) || 0}</p>
                </div>
                <div>
                    <p>Pictures Posted</p>
                    <p className='text-xl font-semibold'>{pictures.length}</p>
                </div>
            </div>
            </div>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                <div className='flex gap-2 items-center'>
                    <Link href={checkQuery ? `/?creator=${creator?._id}/?photos`: `/creator/${creator?._id}/?photos`} as={`/creator/${creator?._id}/?photos`} >
                        <a 
                        style={router.asPath.includes('photos') ? { backgroundColor: 'black', color: 'white'} : {}}
                        className='font-semibold rounded-md p-2'>Photos <span className='text-gray-500'>{pictures.length}</span></a>
                    </Link>
                    {creator?._id === me?._id && <Link href={checkQuery ? `/?creator=${creator?._id}/?collections` :`/creator/${creator?._id}/?collections`} as={`/creator/${creator?._id}/?collections`}>
                        <a 
                        style={router.asPath.includes('collections') ? { backgroundColor: 'black', color: 'white'} : {}}
                        className='font-semibold rounded-md p-2'>Collections</a>
                    </Link>}
                    <Link href={checkQuery ? `/?creator=${creator?._id}/?followers`: `/creator/${creator?._id}/?followers`} as={`/creator/${creator?._id}/?followers`}>
                        <a 
                        style={router.asPath.includes('followers') ? { backgroundColor: 'black', color: 'white'} : {}}
                        className='font-semibold rounded-md p-2'>Followers <span className='text-gray-500'>{creator?.followers?.length ?? 0}</span></a>
                    </Link>
                    <Link href={checkQuery ? `/?creator=${creator?._id}/?following`: `/creator/${creator?._id}/?following`} as={`/creator/${creator?._id}/?following`}>
                        <a 
                        style={router.asPath.includes('following') ? { backgroundColor: 'black', color: 'white'} : {}}
                        className='font-semibold rounded-md p-2'>Following <span className='text-gray-500'>{creator?.following?.length ?? 0}</span></a>
                    </Link>
                </div>
            <div onClick={handleShowSort} className='p-2 text-lg rounded-md  border border-gray-200 hover:border-gray-400 flex items-center gap-2 justify-between relative transitions min-w-[140px] bg-white'>
                {sort}
                <span>{showSort ? <AiOutlineUp /> : <AiOutlineDown />}</span>
                {showSort && <ul className='absolute top-[140%] bg-inherit flex flex-col p-2 rounded-md z-20 w-full shadow-xl shadow-gray-500'>
                   {['Recency', 'Popularity'].map((el, index) => (
                     <li onClick={() => handleSort(el as typeof sort)} key={index} className='navbar__li w-full flex items-center justify-between p-2'>
                        {el}
                        <span>{sort === el ? <AiOutlineCheck /> : ""}</span>
                     </li>
                   ))}
                </ul>}
            </div>
            </div>
            {router.asPath.includes('photos') && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10'>
                {pictures?.length > 0 ? pictures?.map(pic => (
                    <Picture me={me} setText={setText} setIsOpen={setIsOpen} isOpen={isOpen} key={pic._id} image={pic.image} user={creator?._id} _id={pic._id} />
                )) : <>
                    <AnimatedPicture />
                    <AnimatedPicture />
                    <AnimatedPicture />
                    <AnimatedPicture />
                    <AnimatedPicture />
                </>}
            </div>}
            {router.asPath.includes('collections') && <div className='flex flex-col gap-2 mt-10'>
                <h3 className='text-xl font-semibold'>Liked pictures:</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {likedAndBookmarked?.filter(pic => creator?.my_likes.includes(pic._id))?.length ? likedAndBookmarked?.filter(pic => creator?.my_likes.includes(pic._id)).map(pic => (
                        <Picture me={me} setText={setText} setIsOpen={setIsOpen} isOpen={isOpen} key={pic._id} image={pic.image} user={creator?._id} _id={pic._id} />
                    )) : likedAndBookmarked?.filter(pic => creator?.my_likes.includes(pic._id)).length === 0 ? 
                    <p className='text-xl w-full sm:col-span-2 md:col-span-3 text-center'>No pictures to display 😞.</p> 
                        : <>
                        <AnimatedPicture />
                        <AnimatedPicture />
                        <AnimatedPicture />
                        <AnimatedPicture />
                        <AnimatedPicture />
                        </>
                    }
                </div>
                <h3 className='text-xl font-semibold'>Bookmarked pictures:</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {likedAndBookmarked?.filter(pic => creator?.my_bookmarks.includes(pic._id))?.length ? likedAndBookmarked?.filter(pic => creator?.my_bookmarks.includes(pic._id)).map(pic => (
                        <Picture me={me} setText={setText} setIsOpen={setIsOpen} isOpen={isOpen} key={pic._id} image={pic.image} user={creator?._id} _id={pic._id} />
                    )) :  likedAndBookmarked?.filter(pic => creator?.my_bookmarks.includes(pic._id)).length === 0 ? 
                    <p className='text-xl w-full sm:col-span-2 md:col-span-3 text-center'>No pictures to display 😞.</p> :
                        <>
                        <AnimatedPicture />
                        <AnimatedPicture />
                        <AnimatedPicture />
                        <AnimatedPicture />
                        <AnimatedPicture />
                        </>
                    }
                </div>
            </div>}
            {router.asPath.includes('following') && <ul className='list-none flex-col gap-2 flex border border-green-500 mt-2 rounded-md'>
                {me?.following.map(user => (
                <FollowUser key={user} userId={user} />
            ))}
            </ul>}
            {router.asPath.includes('followers') && <ul className='list-none flex-col gap-2 flex border border-green-500 mt-2 rounded-md'>
                {me?.followers.map(user => (
                <FollowUser key={user} userId={user} />
            ))}
            </ul>}
        </Container>
    </section>
  )
}

export default CreatorPage