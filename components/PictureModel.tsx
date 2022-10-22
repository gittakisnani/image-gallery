import { useRouter } from "next/router"
import PicturePage from "./PicturePage"
import { AiOutlineClose } from './Icons'
import { motion } from 'framer-motion'


const PictureModel = () => {
  const router = useRouter();

  const handleRouter = () => router.push(router.pathname)
  return (
    <div className="fixed inset-0 overflow-y-auto z-[1000] md:z-[10000] flex justify-center items-center bg-black/20">
      <button
      onClick={handleRouter} 
      className="absolute right-6 top-6 text-xl text-white">
        <AiOutlineClose />
      </button>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-[90%] h-[90%] overflow-y-auto">
            <PicturePage />
        </motion.div>
    </div>
  )
}

export default PictureModel