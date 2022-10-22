import { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PicturePage from '../components/PicturePage'

const Picture: NextPage = () => {
      return (
        <>
        <Head>
          <title>Picture Page</title>
          <meta name="description" content="Picture page where you can like, collect or download your fav pics, Also you can see related pics, related topics" />
        </Head>
            <Header bg='bg-white' searchBar className=' z-50'  />
            <PicturePage />
            <Footer />
        </>
      )
}

export default Picture