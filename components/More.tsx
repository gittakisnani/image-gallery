import Link from 'next/link'
import { useEffect, useState } from 'react'
import { User } from '../pages/edit-profile'
import { ModalProps } from '../types/types'
import axios from '../utils/axios'
import AnimatedPicture from './AnimatedPicture'
import { PictureInterface } from './ImagesSection'
import OtherLinks from './OtherLinks'
import Picture from './Picture'



interface MoreProps extends ModalProps {
    user: string 
    filter: string
    me: User | null
}
const More = ({ user, filter, setIsOpen, isOpen, setText, me }: MoreProps) => {
    const [morePics, setMorePics] = useState<PictureInterface[]>([])


    useEffect(() => {
        async function findMorePics() {
            try {
                const { data } = await axios.get<PictureInterface[] | null>(`pictures/${user}/pictures`);
                setMorePics(data!.filter(pic => pic._id !== filter))
            } catch(err) {
                console.error(err)
            }
        }

        findMorePics()
    }, [filter, user])
  return (
    <div>
        <h3 className='text-xl md:text-2xl lg:text-3xl text-slate-900 font-semibold mt-6 mb-10'>More like this</h3>
        <OtherLinks />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6'>
            {morePics?.length ? morePics.map(pic => (
                <Picture me={me} setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} key={pic._id} _id={pic._id} user={user} image={pic.image} />
            )): morePics.length === 0 ? 
            <p className='text-xl w-full sm:col-span-2 md:col-span-3 text-center'>No pictures to display 😞.</p>
            :<>
                <AnimatedPicture />
                <AnimatedPicture />
                <AnimatedPicture />
                <AnimatedPicture />
                <AnimatedPicture />
                <AnimatedPicture />
            </>}
        </div>
    </div>
  )
}

export default More