import Head from 'next/head'
import Image from 'next/image'
import { useRef, SyntheticEvent, useEffect, useState } from 'react'
import Container from '../components/Container'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { AiFillCamera, MdError } from '../components/Icons'
import AVATAR from '../public/assets/AVATAR.jpg'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import useSwr, { mutate } from 'swr'
import fetcher from '../utils/fetcher'
import axios from '../utils/axios'
import Loading from '../components/Loading'
import { useRouter } from 'next/router'
import previewFile from '../utils/previewFile'
import { Creator } from '../components/CreatorPage'

const DEFAULT = 'https://cdn.vectorstock.com/i/preview-1x/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.webp'

export interface User {
    firstName: string
    lastName: string
    email: string
    password: string
    picture: string
    location?: string
    website?: string
    twitter?: string
    instagram: string
    yt?: string
    tiktok?: string
    bio?: string
    following: string[]
    followers: string[]
    my_likes: string[]
    my_bookmarks: string[]
    _id: string
}

const EditProfile: NextPage<{ me: User }> = ({ me: fallbackData }) => {
    const [src, setSrc] = useState('');

    const router = useRouter()
    const { data } = useSwr<User | null>(
        'me',
        fetcher,
        { fallbackData }
    )
    
    const email = useRef<HTMLInputElement>(null)
    const firstName = useRef<HTMLInputElement>(null)
    const lastName = useRef<HTMLInputElement>(null)
    const bio = useRef<HTMLTextAreaElement>(null)
    const location = useRef<HTMLInputElement>(null)
    const website = useRef<HTMLInputElement>(null)
    const twitter = useRef<HTMLInputElement>(null)
    const yt = useRef<HTMLInputElement>(null)
    const instagram = useRef<HTMLInputElement>(null)
    const tiktok = useRef<HTMLInputElement>(null);


    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false)
    const takePicRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        if(!data?._id) router.push('/signin');
        data && [lastName, firstName, email, bio, location, website, twitter, yt, instagram, tiktok].forEach(el => el.current!.value = data![el.current!.name as keyof User] as string || '')
    }, [data])

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        const updates: any = { };
        [bio, location, website, twitter, yt, instagram, tiktok].forEach(el => el.current!.value ? updates[el.current!.name] = el.current!.value : '')
        setErrMsg('')
        setLoading(true)
        try{
            const { data: updateData } = await axios.put(`users/${data?._id}`, 
            {
                firstName: firstName.current!.value,
                lastName: lastName.current!.value,
                email: email.current!.value,
                ...updates
            })

            if(updateData.issues) throw new Error('Email is required')
        } catch(err: any) {
            setErrMsg(err.response?.data?.message || err?.message || 'Update failed');
        } finally {
            setLoading(false)
        }
    }

    const handleTakePic = () => takePicRef.current!.click();

    const handleUpdatePicture = async (e: SyntheticEvent) => {
        e.preventDefault();
        if(!src) {
            return setErrMsg('No picture is selected')
        }


        setErrMsg('');
        setLoading(true)
        try {
            //Add picture to db
            const { data: imageUrl } = await axios.post<string>('file/upload', {
                file: takePicRef.current!.files![0]
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            //Change user picture

            await axios.put(`users/${data?._id}`, {
                picture: imageUrl
            })

        } catch(err) {
            setErrMsg('Error updating profile avatar')
        } finally {
            setLoading(false)
        }
    }

    const handleRemovePicture = async () => {
        if(data?.picture === src) return alert('Nice try')

        setSrc(prev => DEFAULT);
        setErrMsg('');
        setLoading(true)
        try {
            await axios.put(`users/${data?._id}`, {
                picture: src
            })

        } catch(err) {
            setErrMsg('Error removing profile avatar')
        } finally {
            setLoading(false)
        }
    }

  return (
    <>
    <Head>
        <title>Edit My Profile</title>
        <meta name="description" content="With this page creators, users can edit their profile pages" />
    </Head>
      <Header user={data!} bg='bg-white' searchBar />
      <main className=''>
      {loading && <div className='fixed bg-black/10 text-white inset-0 flex items-center justify-center'>
                <div className='absolute max-w-[400px] w-[70%] bg-white text-black p-4 rounded-md font-semibold text-xl'>
                    <Loading />
                </div>
        </div>}
        <Container className='!max-w-[800px] py-10'>
            <h2 className='text-2xl md:text-5xl text-slate-900 font-semibold text-center'>
                Profile settings
            </h2>
            <form onSubmit={handleUpdatePicture} className='flex items-center gap-10 p-4'>
                <div className='flex flex-col md:flex-row gap-2 md:items-center'>
                <div className='h-[100px] md:h-[170px] w-[100px] md:w-[170px] rounded-full overflow-hidden border-2 border-green-600 group relative flex justify-center mx-auto '>
                    <Image id='picture' src={src || data?.picture || AVATAR} alt='Profile pic' height={'200px'} width="200px" />

                    <div className='opacity-0 transitions group-hover:opacity-100 bg-black/30 absolute inset-0 flex items-center justify-center text-3xl'>
                        <span className='hover:text-white transitions cursor-pointer'>
                            <AiFillCamera onClick={handleTakePic} title='Change avatar' />
                        </span>
                    </div>
                </div>
                <div className='relative flex justify-start items-start flex-wrap'>
                <input 
                type="file"
                onChange={() => previewFile(takePicRef, src, setSrc)}
                ref={takePicRef} 
                className='file:p-2 file:font-semibold file:bg-green-600 file:text-lg file:text-white file:border-none file:outline-none file:rounded-md file:cursor-pointer opacity-0 z-10'
                />
                <button className='font-semibold p-2 md:p-3 bg-green-600 text-lg text-white rounded-md absolute'>Choose file</button>
                <button onClick={handleRemovePicture} type='button' className='font-semibold p-2 bg-gray-200 transitions hover:bg-gray-300 text-lg text-black rounded-md z-20 mr-2'>Remove</button>
                {src && src !== DEFAULT && <button className='font-semibold p-2 bg-green-500 transitions hover:bg-green-600 text-lg text-white rounded-md z-20'>Update</button>}
                </div>
                </div>
            </form>
                <form onSubmit={handleUpdate} className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
                    <label htmlFor="fName" className='edit_label'>
                        First Name
                        <input 
                        ref={firstName}
                        id='fName'
                        className='edit_input'
                        type="text" 
                        name='firstName'
                        />
                    </label>
                    <label htmlFor="lName" className='edit_label'>
                        Last Name
                        <input
                        ref={lastName} 
                        id='lName'
                        className='edit_input'
                        type="text" 
                        name='lastName'
                        />
                    </label>
                    <p className='col-span-2 text-gray-500 font-semibold'>We’d like people to use real names in a community, so people would know who’s who.</p>
                    <label htmlFor="email" className='edit_label'>
                        Email
                        <input 
                        id='email'
                        className='edit_input'
                        type="email" 
                        ref={email}
                        name='email'
                        />
                    </label>
                    <h3 className='col-span-2 text-2xl font-semibold'>Recognition</h3>
                    <label htmlFor="bio" className='edit_label col-span-2'>
                        Bio
                        <textarea 
                        ref={bio}
                        id='bio'
                        className='edit_input resize-y min-h-[90px]'
                        name='bio'
                        />
                    </label>
                    <p className='col-span-2 text-gray-500 font-semibold'>Brief description for your profile.</p>
                    <label htmlFor="location" className='edit_label'>
                        Location
                        <input 
                        ref={location}
                        id='location'
                        className='edit_input'
                        type="text" 
                        name='location'
                        />
                    </label>
                    <label htmlFor="website" className='edit_label'>
                        Website
                        <input 
                        ref={website}
                        id='website'
                        className='edit_input'
                        type="text" 
                        name='website'
                        />
                    </label>
                    <label htmlFor="twitter" className='edit_label'>
                        Twitter
                        <input 
                        ref={twitter}
                        id='twitter'
                        className='edit_input'
                        type="text" 
                        name='twitter'
                        />
                    </label>
                    <label htmlFor="instagram" className='edit_label'>
                        Instagram
                        <input 
                        ref={instagram}
                        id='instagram'
                        className='edit_input'
                        type="text" 
                        name='instagram'
                        />
                    </label>
                    <label htmlFor="ytb" className='edit_label'>
                        Youtube
                        <input 
                        ref={yt}
                        id='ytb'
                        className='edit_input'
                        type="text" 
                        name='yt'
                        />
                    </label>
                    <label htmlFor="tiktok" className='edit_label'>
                        TikTok
                        <input 
                        ref={tiktok}
                        id='tiktok'
                        className='edit_input'
                        type="text" 
                        name='tiktok'
                        />
                    </label>
                    {errMsg && <p className='text-red-600 text-left flex gap-2 items-center font-semibold'>
                        <span className='text-xl'><MdError /></span>
                        {errMsg}
                    </p>}
                    <button className='col-span-2 text-white p-2 rounded-md font-semibold bg-green-600'>Save changes</button>
                </form>
        </Container>
      </main>
      <Footer />
    </>
  )
}



export default EditProfile


export const getStaticProps: GetStaticProps =  async (context) => {
    const me = await fetcher<Creator>('me');
    return {
        props : {
            me,
        }
    }
}   