import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useRef, SyntheticEvent, useEffect } from 'react'
import useSWR from 'swr'
import Container from '../components/Container'
import Header from '../components/Header'
import { AiFillCheckCircle, MdError } from '../components/Icons'
import Loading from '../components/Loading'
import axios from '../utils/axios'
import fetcher from '../utils/fetcher'
import previewFile from '../utils/previewFile'
import { User } from './edit-profile'


const instructions = [
    'Original content you captured',
    'Mindful of the rights of others',
    'High quality photos',
    'Excludes graphic nudity, violence, or hate',
    'To be downloaded and used for free',
    'Read Our Terms'
]


const Upload: NextPage<{ me: User }> = ({ me: fallbackData }) => {
    const router = useRouter()

    const [src, setSrc] = useState('')
    const [free, setFree] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false)

    const locationRef = useRef<HTMLInputElement>(null)
    const fileRef = useRef<null | HTMLInputElement>(null!)
    const formRef = useRef<HTMLFormElement>(null)

    const { data: currentUser } = useSWR<User | null>(
        'me',
        fetcher,
        { fallbackData }
    )


    useEffect(() => {
        if(!currentUser?._id) router.push('/signin')
    }, [currentUser])


    const handleUpload = async (e: SyntheticEvent) => {
        e.preventDefault();
        if(!src) {
            return alert('No picture found')
        }

        setErrMsg('');
        setLoading(true)

        try {
            //Add image to DB
            const { data: image } = await axios.post('file/upload', {
                file: fileRef.current!.files![0]
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            
            //Create new image document in DB
            const { data: picture } = await axios.post('pictures/new', {
                image,
                user: currentUser?._id,
                free,
                location: locationRef.current!.value || ''
            })

            console.log(picture)
        } catch (error) {
            setErrMsg('Error uploading picture')
        } finally {
            setLoading(false)
        }

    }

  return (
    <>
    <Head>
        <title>Upload</title>
        <meta name="description" content="Upload picture page with some instructions" />
    </Head>
    <Header user={currentUser!} bg='bg-white' searchBar/> 
    <main className='bg-white'>
        {loading && <div className='fixed bg-black/10 text-white inset-0 flex items-center justify-center'>
                <div className='absolute max-w-[400px] w-[70%] bg-white text-black p-4 rounded-md font-semibold text-xl'>
                    <Loading />
                </div>
        </div>}
        <Container className='!max-w-[1100px] p-4'>
            <form ref={formRef} onSubmit={handleUpload} encType='multipart/form-data' className='rounded-xl p-6 md:p-8 border-dashed border-[3px] border-green-300'>
                <div className='flex items-center flex-col gap-6 flex-1'>
                    <h3 className='text-2xl md:text-4xl text-center font-semibold text-slate-700'>
                        Drag and drop to upload
                    </h3>
                    <div className='relative flex justify-center items-center'>
                    <button className='bg-green-600 text-white font-semibold text-lg p-2 rounded-md absolute'>Upload photo</button>
                    <input 
                    accept='image/*'
                    onChange={() => previewFile(fileRef, src, setSrc)} 
                    ref={fileRef} 
                    type="file" 
                    name='file'
                    className='file:text-white file:font-semibold file:text-lg file:rounded-md file:bg-green-600 file:p-2 file:border-none mx-auto opacity-0 cursor-pointer' />
                    </div>
                    {src && <div className='w-full flex flex-col md:items-center md:flex-row gap-4'>
                     <div className='showPicture w-[250px] h-[160px] border'>
                        <img src={src} alt={'New photo'} className='h-full w-full bg-cover' />
                    </div>
                    <div className='grid grid-cols-1 gap-2 flex-1'>
                        <label htmlFor="fileTitle" className='edit_label'>
                            Location (Opt)
                            <input ref={locationRef} id='fileTitle' type={'text'} className="edit_input" />
                        </label>
                        <label htmlFor="desc" className='flex gap-2 items-center font-semibold text-lg text-gray-500'>
                            <input 
                            type="checkbox" 
                            checked={free}
                            onChange={() => setFree(!free)}
                            className='accent-green-600 h-6 w-6 cursor-pointer'
                            />
                            Free
                        </label>
                    </div>
                    </div>}
                    {errMsg && <p className='text-red-600 text-left flex gap-2 items-center font-semibold text-lg w-full'>
                        <span className='text-xl'><MdError /></span>
                        {errMsg}
                    </p>}
                <button className='p-2 rounded-md bg-green-600 text-white font-semibold text-lg my-4 self-end'>Post photo</button>
                </div>
            </form>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 w-fit md:mx-auto'>
            {instructions.map((ins, index) => (
                <p className='flex gap-1 text-gray-500 font-semibold text-sm' key={index}>
                    <span className='text-lg text-green-600'><AiFillCheckCircle /></span>
                    {ins}
                </p>
            ))}
            </div>
        </Container>
    </main>
    </>
  )
}

export default Upload;

export const getStaticProps: GetStaticProps = async () => {
    const me = await fetcher<User>('me')
    return {
        props: {
            me
        }
    }
}