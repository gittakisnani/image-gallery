import { Dialog } from '@headlessui/react'
import React from 'react'
import { AiOutlineClose } from './Icons'
import { PictureInfosProps } from '../types/types'
import Image from 'next/image'

const PictureInfos = ({ url, createdAt, views, likes, downloads, infos, setInfos }: PictureInfosProps) => {
    return (
        <Dialog
          open={infos}
          onClose={() => setInfos(false)}
          className="relative z-[1000000]"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
    
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4 text-white">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="mx-auto max-w-md rounded-xl bg-black p-6 relative">
              <button onClick={() => setInfos(false)} className="text-3xl transitions hover:text-white text-gray-500 absolute top-[-40px] right-0">
                  <AiOutlineClose />
              </button>
              <Dialog.Title className='text-2xl md:text-4xl font-bold text-center'>Image details</Dialog.Title>
                <div className='flex justify-center items-center my-2'>
                <Image src={url} alt='Picture Infos' width={100} height={100} />
                </div>
                <div className='flex flex-col gap-2 my-2'>
                    <h3 className='font-semibold'>Views: {views}</h3>
                    <h3 className='font-semibold'>Likes: {likes}</h3>
                    <h3 className='font-semibold'>Downloads: {downloads}</h3>
                    <h3 className='font-semibold'>Picture posted on {new Date(createdAt).toDateString()}</h3>
                </div>
              </Dialog.Panel>
          </div>
        </Dialog>
      )
}

export default PictureInfos