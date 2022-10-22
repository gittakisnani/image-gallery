import { useState } from 'react'
import Image from 'next/image'
import useWindowSize from '../hooks/useWindowSize'
import Container from './Container'
import { BsBookmarks, BsBookmarksFill, AiFillHeart, AiOutlineHeart, AiOutlineCheck, FaMapMarkerAlt, AiFillCheckCircle, BsFillInfoCircleFill, GrShare, FiUserPlus} from './Icons'
import More from './More'
import Share from './Share'
const PicturePage = () => {
  const [share, setShare] = useState(false)
  const { width } = useWindowSize()

  return (
    <main className='bg-white'>
      <Share share={share} setShare={setShare} />
      <Container className='p-4 md:p-6'>
        <div className='flex justify-between items-center '>
          {width! >= 768 && <div className='flex gap-2 items-center'>
            <div className='h-12 w-12 rounded-full overflow-hidden'>
              <Image src='https://images.pexels.com/users/avatars/139433618/dominika-mazur-209.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=1' alt='User' width='50px' height='50px' />
            </div>
            <div className='flex flex-col text-lg'>
              <h3 className='text-black font-bold'>John Doe</h3>
              <p className='text-gray-500 font-semibold'>Follow</p>
            </div>
          </div>}
            <div className='flex gap-2 items-center flex-1 justify-end'>
              <button className='action-button flex self-stretch gap-2 items-center border border-gray-200 hover:border-gray-300 text-lg p-2 rounded-md font-semibold'>
                <span><BsBookmarks /></span>
                <p className='hidden md:block'>Collect</p>
              </button>
              <button className='action-button flex self-stretch gap-2 items-center border border-gray-200 hover:border-gray-300 text-lg p-2 rounded-md font-semibold'>
                <span><AiOutlineHeart /></span>
                <p className='hidden md:block'>Like</p>
              </button>
              <button className='text-white bg-green-600 font-semibold text-lg p-2 px-4 rounded-md'>
                Download
              </button>
            </div>  
        </div>
        <div className='mx-auto w-fit max-w-[500px] h-[650px] my-10'>
          <Image src="https://images.pexels.com/photos/11719113/pexels-photo-11719113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='Image' width='400px' height="650px" />
        </div>
        <div className='flex gap-2 justify-between items-center'>
          <div className='flex items-center gap-2'>
            <div className='flex gap-1 text-gray-500'>
              <span className='text-xl'><AiFillCheckCircle /></span>
              <p className='font-semibold'>Free to use</p>
            </div>
            <div className='flex gap-1 text-gray-500'>
              <span className='text-xl'><FaMapMarkerAlt /></span>
              <p className='font-semibold'>Zakinthos, Greece</p>
            </div>
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
            <div className='flex gap-2 items-center'>
                  <div className='h-12 w-12 rounded-full overflow-hidden'>
                    <Image src='https://images.pexels.com/users/avatars/139433618/dominika-mazur-209.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=1' alt='User' width='50px' height='50px' />
                  </div>
                  <h3 className='text-black font-bold'>John Doe</h3>
            </div>
            <button className='action-button flex self-stretch gap-2 items-center border border-gray-200 hover:border-gray-300 text-xl p-2 rounded-md'>
              <FiUserPlus />
            </button>
        </div>}
        <More />
      </Container>
    </main>
  )
}

export default PicturePage