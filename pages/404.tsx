import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const NotFound = () => {
  return (
    <>
    <Head>
        <title>Not Found</title>
        <meta name="description" content="404, Page not found for some reason" />
    </Head>
    <Header bg='bg-white' className='fixed top-0 right-0 left-0 shadow-xl shadow-gray-100' />
    <main className='h-screen flex flex-col items-center justify-center gap-2 p-4'>
        <h2 className='text-6xl md:text-9xl font-extrabold text-green-600'>Oops!</h2>
        <h3 className='text-2xl md:text-4xl font-semibold'>404 - PAGE NOT FOUND</h3>
        <p className='text-green-600/80 font-semibold text-lg max-w-[600px] text-center'>
            The page you are looking for might have been removed, had its name changed or temporarily removed.
        </p>
        <Link href='/'>
            <a className='transitions bg-green-600/80 hover:bg-green-600 font-semibold text-lg p-3 px-6 text-white rounded-3xl'>
                Back To Home
            </a>
        </Link>
    </main>
    <Footer />
    </>
  )
}

export default NotFound