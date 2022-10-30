import { useState, useEffect } from 'react'
import Container from './Container'
import { AiOutlineUp, AiOutlineDown, AiOutlineCheck} from './Icons'
import Picture from './Picture'
import axios from '../utils/axios'
import AnimatedPicture from './AnimatedPicture'
import { ModalProps } from '../types/types'
import { User } from '../pages/edit-profile'


export interface PictureInterface {
    _id: string
    likes: string[]
    views: string[]
    downloads: number
    free: boolean
    location: string
    size: number
    image: string
    user: string
}
const ImagesSection = ({ setIsOpen, isOpen, setText, me }: ModalProps & { me: User | null}) => {
    const [sort, setSort] = useState('Trending')
    const [showSorts, setShowSorts] = useState(false);
    const [pictures, setPictures] = useState<PictureInterface[]>([])

    const handleSetSort = (sort: string) => {
        setShowSorts(false);
        setSort(sort)
    }

    useEffect(() => {
        async function getPictures() {
            try {
                const { data } = await axios.get<PictureInterface[] | null>('pictures');


                setPictures(data!)
            } catch(err) {
                console.error(err)
            }
        }

        getPictures()
    }, [])

  return (
    <section id='explore' className='bg-white'>
        <Container className='p-4 px-8 md:p-6 md:px-14'>
            <div className='flex items-center justify-between'>
                <h3 className='text-xl md:text-2xl font-semibold'>
                    Free Stock photos
                </h3>
                <div onClick={() => setShowSorts(!showSorts)} className='p-2 border border-gray-200 hover:border-gray-300 transitions relative flex justify-between items-center w-[120px] rounded-md'>
                    <p>{sort}</p>
                    <span>{showSorts ? <AiOutlineUp /> : <AiOutlineDown />}</span>
                    {showSorts && <ul className='bg-white shadow-2xl p-4 absolute top-[120%] z-20 rounded-md'>
                        {['Trending', 'New'].map(el => (
                            <li onClick={() => handleSetSort(el)} key={el} className='navbar__li flex items-center justify-between p-2 rounded-md cursor-pointer'>
                                <p>{el}</p>
                                {el === sort && <span><AiOutlineCheck /></span>}
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
            <div className='my-10 max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                {pictures.length > 0 ? pictures.map(pic => (
                    <Picture me={me} user={pic.user} key={pic._id} image={pic.image} setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} _id={pic._id} />
                ))

                : <>
                <AnimatedPicture />
                <AnimatedPicture />
                <AnimatedPicture />
                <AnimatedPicture />
                <AnimatedPicture />
                <AnimatedPicture />
                
                </>}

            </div>
        </Container>
    </section>
  )
}

export default ImagesSection