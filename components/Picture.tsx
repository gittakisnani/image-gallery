import React from 'react'
import Image from 'next/image'
import { BsBookmarks, BsBookmarksFill, AiFillHeart, AiOutlineHeart, BsDownload} from './Icons'
const Picture = () => {
  return (
    <div className='relative'>
      <div className='absolute top-0 right-0 left-0 z-10 flex justify-end items-center gap-2 p-2'>
        <button className='h-10 w-10 flex justify-center items-center bg-gray-50 action-button text-xl rounded-md'>
          <BsBookmarks />
        </button>
        <button className='h-10 w-10 flex justify-center items-center bg-gray-50 action-button text-xl rounded-md'>
          <AiOutlineHeart />
        </button>
      </div>
      <div className='absolute z-10 bottom-0 left-0 right-0 flex justify-between items-center p-2 py-4'>
        {/* Creator */}
        <div className='flex gap-2 items-center'>
          <div className='h-10 w-10 rounded-full overflow-hidden'>
            <Image src="https://images.pexels.com/users/avatars/139433618/dominika-mazur-209.jpeg?auto=compress&fit=crop&h=40&w=40&dpr=1" alt='Image' width="40px" height="40px" />
          </div>
          <h5 className='name text-lg font-semibold text-white'>John Doe</h5>
        </div>
        {/* Download */}
        <button className='h-10 w-10 flex justify-center items-center bg-gray-50 action-button text-xl rounded-md'>
          <BsDownload />
        </button>
      </div>
      <Image src='https://images.pexels.com/photos/11719113/pexels-photo-11719113.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='Image' height="600px" width="500px" />
    </div>
  )
}

export default Picture