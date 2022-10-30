import { useRouter } from "next/router"
import PicturePage from "./PicturePage"
import { AiOutlineClose } from './Icons'
import { motion } from 'framer-motion'
import { useState } from "react"
import Modal from "./Modal"

const PictureModel = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('')

  const handleRouter = () => router.push(router.pathname)
  return (
    <div className="fixed inset-0 overflow-y-auto z-[1000000] md:z-[10000] flex justify-center items-center bg-black/20">
      <button
      onClick={handleRouter} 
      className="absolute right-4 top-4 md:right-6 md:top-6 text-2xl p-1 bg-black rounded-md text-white">
        <AiOutlineClose />
      </button>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-[90%] h-[90%] overflow-y-auto">
        <Modal setIsOpen={setIsOpen} isOpen={isOpen} text={text} />
        <PicturePage setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} />
        </motion.div>
    </div>
  )
}

export default PictureModel