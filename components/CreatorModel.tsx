import { useRouter } from "next/router"
import CreatorPage from "./CreatorPage";
import { AiOutlineClose } from './Icons'



const CreatorModel = () => {
  const router = useRouter();

  const handleRouter = () => router.push(router.pathname)
  return (
    <div className="fixed inset-0 overflow-y-auto z-[1000] md:z-[10000] flex justify-center items-center bg-black/20">
      <button
      onClick={handleRouter} 
      className="absolute right-6 top-6 text-xl text-white">
        <AiOutlineClose />
      </button>
        <div className="w-[90%] h-[90%] overflow-y-auto">
            <CreatorPage />
        </div>
    </div>
  )
}

export default CreatorModel