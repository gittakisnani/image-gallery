import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import fetcher from '../../utils/fetcher'
import { PictureInterface } from '../../components/ImagesSection'
import { User } from '../edit-profile'
import useSWR from 'swr'
import Header from '../../components/Header'
import Picture from '../../components/Picture'
import AnimatedPicture from '../../components/AnimatedPicture'
import Footer from '../../components/Footer'


const Search: NextPage<{ pictures: PictureInterface[], me: User }> = ({ pictures, me }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');

    const { data: picturesData } = useSWR<PictureInterface[] | null>(
        'pictures',
        fetcher,
        { fallbackData: pictures }
    )

    const { data: loggedUser } = useSWR<User | null>(
        'me',
        fetcher,
        { fallbackData: me }
    )

  return (
    <>
    <Header searchBar user={loggedUser!} />
    <main>
        {router.query.search && <p className='px-4 md:px-6 lg:px-8 text-xl'>Search: {router.query.search}</p>}
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 md:p-6 lg:p-10'>
            {picturesData?.length ? picturesData?.map(pic => (
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
        </section>
    </main>
    <Footer />
    </>
  )
}

export default Search


export const getServerSideProps: GetServerSideProps = async () => {
    const pictures = await fetcher<PictureInterface[]>('pictures');
    const me = await fetcher<User>('me')
    return {
        props: {
            pictures,
            me
        }
    }
}