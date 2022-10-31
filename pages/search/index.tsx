import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import useSWR from 'swr'
import Header from '../../components/Header'
import { PictureInterface } from '../../components/ImagesSection'
import fetcher from '../../utils/fetcher'
import { User } from '../edit-profile'
import { useState } from 'react'
import AnimatedPicture from '../../components/AnimatedPicture'
import Picture from '../../components/Picture'
import Footer from '../../components/Footer'


const Search: NextPage<{ pictures: PictureInterface[], me: User}> = ({ pictures, me }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('')
    const { data: picturesData } = useSWR<PictureInterface[] | null>(
        'pictures',
        fetcher,
        { fallbackData: pictures}
    )

    const { data: loggedUser} = useSWR<User | null>(
        'me',
        fetcher,
        { fallbackData: me }
    )


  return (
    <>
    <Header user={loggedUser!} searchBar />
    <main>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 md:p-6 lg:p-10'>
            {picturesData?.length ? picturesData.map(pic => (
                <Picture me={loggedUser!} setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} key={pic._id} _id={pic._id} user={pic.user!} image={pic.image} />
            )): picturesData?.length === 0 ? 
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
    </main>
    <Footer />
    </>
  )
}

export default Search


export const getStaticProps: GetStaticProps = async () => {
    const pictures = await fetcher<PictureInterface[]>('pictures');
    const me = await fetcher('me')
    return {
        props: {
            pictures,
            me
        }
    }
}