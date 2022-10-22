import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState} from 'react'
import CreatorPage from '../components/CreatorPage'
import Footer from '../components/Footer'
import Header from '../components/Header'



const Creator: NextPage = () => {
      return (
        <>
        <Head>
          <title>Creator Page</title>
          <meta name="description" content="Creators page allow you to see all his pictures, follow him...." />
        </Head>
          <main className=''>
            <Header bg='bg-white' searchBar className=' z-50'  />
            <CreatorPage />
            {/*<PicturePage /> */}
          </main>
          <Footer />
        </>
      )
}

export default Creator