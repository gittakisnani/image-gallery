import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { PictureInterface } from '../../components/ImagesSection'
import PicturePage from '../../components/PicturePage'
import axios from '../../utils/axios'
import Modal from '../../components/Modal'
import fetcher from '../../utils/fetcher'
import { User } from '../edit-profile'
import useSWR from 'swr'

const Picture: NextPage<{ picture: PictureInterface | null, me: User}> = ({ picture, me }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('');

  const { data: loggedUser } = useSWR<User | null>(
    'me',
    fetcher,
    { fallbackData: me }
  )

  
      return (
        <>
        <Head>
          <title>Picture Page</title>
          <meta name="description" content="Picture page where you can like, collect or download your fav pics, Also you can see related pics, related topics" />
        </Head>
            <Header user={loggedUser!} bg='bg-white' searchBar className=' z-50'  />
            <main>
            <Modal setIsOpen={setIsOpen} isOpen={isOpen} text={text} />
            <PicturePage setIsOpen={setIsOpen} isOpen={isOpen} setText={setText} picture={picture!} />
            </main>
            <Footer />
        </>
      )
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pictureId } = context.query;
  const { data = null } = await axios.get<PictureInterface | null>(`pictures/${String(pictureId)}`)
  const me = await fetcher<User>('me')
  return {
    props: {
      picture: data,
      me
    }
  }
}
export default Picture