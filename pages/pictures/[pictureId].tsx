import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { PictureInterface } from '../../components/ImagesSection'
import PicturePage from '../../components/PicturePage'
import axios from '../../utils/axios'
import Modal from '../../components/Modal'

const Picture: NextPage<{ picture: PictureInterface | null}> = ({ picture }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('');
      return (
        <>
        <Head>
          <title>Picture Page</title>
          <meta name="description" content="Picture page where you can like, collect or download your fav pics, Also you can see related pics, related topics" />
        </Head>
            <Header bg='bg-white' searchBar className=' z-50'  />
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
  return {
    props: {
      picture: data
    }
  }
}
export default Picture