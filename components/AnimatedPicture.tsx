import { motion } from 'framer-motion'
const AnimatedPicture = () => {
  return (
    <div className='w-full max-w-[400px] h-[600px] flex flex-col justify-between bg-gray-200 p-2 relative overflow-hidden'>
      <div className='flex justify-end gap-2 items-center z-10'>
        <span className='w-[40px] h-[40px] bg-gray-400 rounded-md'></span>
        <span className='w-[40px] h-[40px] bg-gray-400 rounded-md'></span>
      </div>
      <div className='flex justify-between z-10'>
        <div className='flex gap-2 items-center'>
          <span className='h-[40px] w-[40px] rounded-full bg-gray-400'></span>
          <span className='px-8 py-2 bg-gray-400 rounded-md'></span>
        </div>
        <div className='flex gap-2 items-center z-10'>
          <span className='w-[40px] h-[40px] bg-gray-400 rounded-md'></span>
          <span className='w-[40px] h-[40px] bg-gray-400 rounded-md'></span>
        </div>
      </div>

      <motion.div animate={{ left: '100%' }} transition={{ repeat: Infinity, duration: 1 }} className="absolute top-0 bottom-0 w-[50%] loader" ></motion.div>
    </div>
  )
}

export default AnimatedPicture