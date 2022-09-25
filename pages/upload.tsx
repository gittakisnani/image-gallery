import Head from 'next/head'
import { useState, useRef } from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import { AiFillCheckCircle } from '../components/Icons'

const instructions = [
    'Original content you captured',
    'Mindful of the rights of others',
    'High quality photos',
    'Excludes graphic nudity, violence, or hate',
    'To be downloaded and used for free',
    'Read Our Terms'
]
const Upload = () => {
    const [src, setSrc] = useState('')
    const fileRef = useRef<null | HTMLInputElement>(null!)

    const previewFile = () => {
        const file = fileRef.current?.files![0]
        const reader  = new FileReader();
        
        reader.onloadend = function () {
            setSrc(String(reader.result))
        }
        
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setSrc('')
        }
        }

  return (
    <>
    <Head>
        <title>Upload</title>
        <meta name="description" content="Upload picture page with some instructions" />
    </Head>
    <Header bg='bg-white' searchBar/> 
    <main className='bg-white'>
        <Container className='!max-w-[1100px] p-4'>
            <form className='rounded-xl p-6 md:p-8 border-dashed border-[3px] border-green-300'>
                <div className='flex items-center flex-col gap-6 flex-1'>
                    <h3 className='text-2xl md:text-4xl text-center font-semibold text-slate-700'>
                        Drag and drop to upload
                    </h3>
                    <div className='relative flex justify-center items-center'>
                    <button className='bg-green-600 text-white font-semibold text-lg p-2 rounded-md absolute'>Upload photo</button>
                    <input 
                    accept='image/*'
                    onChange={previewFile} 
                    ref={fileRef} 
                    type="file" 
                    className='file:text-white file:font-semibold file:text-lg file:rounded-md file:bg-green-600 file:p-2 file:border-none mx-auto opacity-0 cursor-pointer' />
                    </div>
                    {src && <div className='w-full flex flex-col md:items-center md:flex-row gap-4'>
                     <div className='showPicture w-[250px] h-[160px] border'>
                        <img src={src} alt={'New photo'} className='h-full w-full bg-cover' />
                    </div>
                    <div className='grid grid-cols-1 gap-2 flex-1'>
                        <label htmlFor="fileTitle" className='edit_label'>
                            Title (required)
                            <input id='fileTitle' type={'text'} className="edit_input" />
                            <p className='flex gap-2 items-center text-gray-600 font-semibold text-sm'>
                                The title should match your picture.
                            </p>
                        </label>
                        <label htmlFor="desc" className='edit_label'>
                            Description (optional)
                            <textarea id='desc' className="edit_input resize-y min-h-[30px]" />
                            <p className='flex gap-2 items-center text-gray-600 font-semibold text-sm'>
                                The Description should match your picture.
                            </p>
                        </label>
                    </div>
                    </div>}
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

export default Upload