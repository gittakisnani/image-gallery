import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Link from 'next/link'
import { FaPinterestP, AiFillFacebook, BsLinkedin, BsTwitter, TiSocialTumbler, MdOutlineContentCopy, AiOutlineClose} from './Icons'
import { ShareProps } from '../types/types'


export default function Share({ share, setShare}: ShareProps) {
    const [text, setText] = useState('Photo bt John Doe from TakiSnani')

    const handleText = () => {
        if(text === 'Copied!') return;
        setText('Copied!')
        setTimeout(() => setText('Photo bt John Doe from TakiSnani'), 2000)
    }
    return (
      <Dialog
        open={share}
        onClose={() => setShare(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
  
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-md rounded-xl bg-white p-6 relative">
            <button onClick={() => setShare(false)} className="text-3xl transitions hover:text-white text-gray-500 absolute top-[-40px] right-0">
                <AiOutlineClose />
            </button>
            <Dialog.Title className='text-2xl md:text-4xl font-bold text-center'>Share this with your Community</Dialog.Title>
            <div className='flex items-center gap-2 justify-center my-4'>
                <a href='https://www.pinterest.com/pin/create/a/'>
                    <a className='bg-[#E60023]/20 text-[#E60023] transitions hover:bg-[#E60023]/30 text-xl rounded-full h-12 w-12 grid place-items-center'>
                        <FaPinterestP />
                    </a>
                </a>
                <a href='https://www.facebook.com/sharer/sharer.php?u='>
                    <a className='bg-[#4267B2]/20 text-[#4267B2] transitions hover:bg-[#4267B2]/30 text-xl rounded-full h-12 w-12 grid place-items-center'>
                        <AiFillFacebook  />
                    </a>
                </a>
                <a href='https://twitter.com/intent/tweet?url'>
                    <a className='bg-[#1DA1F2]/20 text-[#1DA1F2] transitions hover:bg-[#1DA1F2]/30 text-xl rounded-full h-12 w-12 grid place-items-center'>
                        <BsTwitter />
                    </a>
                </a>
                <a href='https://www.linkedin.com/sharing/share-offsite/?url'>
                    <a className='bg-[#0077b5]/20 text-[#0077b5] transitions hover:bg-[#0077b5]/30 text-xl rounded-full h-12 w-12 grid place-items-center'>
                        <BsLinkedin />
                    </a>
                </a>
                <a href='https://www.tumblr.com/widgets/share/tool/preview?canonicalUrl='>
                    <a className='bg-[#35465C]/20 text-[#35465C] transitions hover:bg-[#35465C]/30 text-3xl rounded-full h-12 w-12 grid place-items-center'>
                        <TiSocialTumbler />
                    </a>
                </a>
                </div>
                <p className='text-gray-400 font-semibold mb-2'>Set a link back to this photo</p>
                <div className='mx-auto w-full border border-gray-400 bg-gray-200 text-gray-500 p-3 rounded-md flex items-center justify-between text-sm font-semibold'>
                    {text}
                    <button onClick={handleText} title='Copy to clipboard' className='text-xl'>
                        <MdOutlineContentCopy />
                    </button>
                </div>
            </Dialog.Panel>
        </div>
      </Dialog>
    )
}