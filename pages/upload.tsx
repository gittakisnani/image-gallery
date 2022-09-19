import { useState, useRef } from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import { AiFillCheckCircle } from '../components/Icons'
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
    <Header bg='bg-white' searchBar/> 
    <main className='bg-white'>
        <Container className='max-w-[800px] p-4'>
            <form className='rounded-xl p-8 md:p-12 border border-dashed border-green-300'>
                <div className='flex items-center flex-col gap-6 flex-1'>
                    <h3 className='text-2xl md:text-4xl text-center font-semibold text-slate-700'>
                        Drag and drop to upload
                    </h3>
                    <input 
                    accept='image/*'
                    onChange={previewFile} 
                    ref={fileRef} 
                    type="file" 
                    className='file:text-white file:font-semibold file:text-lg file:rounded-md file:bg-green-600 file:p-2 file:border-none mx-auto' />
                    {src && <div className='w-full flex flex-col md:items-center md:flex-row gap-4'>
                     <div className='showPicture w-[250px] h-[160px] border'>
                        <img src={src} alt={'New photo'} className='h-full w-full bg-cover' />
                    </div>
                    <div className='grid grid-cols-1 gap-2 flex-1'>
                        <label htmlFor="fileTitle" className='edit_label'>
                            Title
                            <input id='fileTitle' type={'text'} className="edit_input" />
                        </label>
                        <label htmlFor="desc" className='edit_label'>
                            Description
                            <textarea id='desc' className="edit_input resize-y min-h-[30px]" />
                        </label>
                    </div>
                    </div>}
                <button className='p-2 rounded-md bg-green-600 text-white font-semibold text-lg my-4 self-end'>Post photo</button>
                </div>
            </form>
        </Container>
    </main>
    </>
  )
}

export default Upload