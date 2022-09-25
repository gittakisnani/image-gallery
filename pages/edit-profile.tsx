import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Container from '../components/Container'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BG from '../public/assets/BG.webp'
const EditProfile = () => {
  return (
    <>
    <Head>
        <title>Edit My Profile</title>
        <meta name="description" content="With this page creators, users can edit their profile pages" />
    </Head>
      <Header bg='bg-white' searchBar  />
      <main className=''>
        <Container className='!max-w-[800px] py-10'>
            <h2 className='text-2xl md:text-5xl text-slate-900 font-semibold text-center'>
                Profile settings
            </h2>
            <div className='flex items-center gap-10 p-4'>
                <div className='h-[100px] md:h-[170px] w-[100px] md:w-[170px] rounded-full overflow-hidden'>
                    <Image src={BG} alt='Profile pic' height={'200px'} width="200px" />
                </div>
                <input 
                type="file" 
                className='file:p-2 file:font-semibold file:bg-green-600 file:text-lg file:text-white file:border-none file:outline-none file:rounded-md file:cursor-pointer'
                />
            </div>
                <form className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
                    <label htmlFor="fName" className='edit_label'>
                        First Name
                        <input 
                        id='fName'
                        className='edit_input'
                        type="text" />
                    </label>
                    <label htmlFor="lName" className='edit_label'>
                        Last Name
                        <input 
                        id='lName'
                        className='edit_input'
                        type="text" />
                    </label>
                    <p className='md:col-span-2 text-gray-500 font-semibold'>We’d like people to use real names in a community, so people would know who’s who.</p>
                    <label htmlFor="email" className='edit_label'>
                        Email
                        <input 
                        id='email'
                        className='edit_input'
                        type="email" />
                    </label>
                    <label htmlFor="pwd" className='edit_label'>
                        Password
                        <input 
                        id='pwd'
                        className='edit_input'
                        type="password" />
                    </label>
                    <h3 className='md:col-span-2 text-2xl font-semibold'>Recognition</h3>
                    <label htmlFor="bio" className='edit_label md:col-span-2'>
                        Bio
                        <textarea 
                        id='bio'
                        className='edit_input resize-y min-h-[90px] '
                        />
                    </label>
                    <p className='md:col-span-2 text-gray-500 font-semibold'>Brief description for your profile.</p>
                    <label htmlFor="location" className='edit_label'>
                        Location
                        <input 
                        id='location'
                        className='edit_input'
                        type="text" />
                    </label>
                    <label htmlFor="website" className='edit_label'>
                        Website
                        <input 
                        id='website'
                        className='edit_input'
                        type="text" />
                    </label>
                    <label htmlFor="twitter" className='edit_label'>
                        Twitter
                        <input 
                        id='twitter'
                        className='edit_input'
                        type="text" />
                    </label>
                    <label htmlFor="instagram" className='edit_label'>
                        Instagram
                        <input 
                        id='instagram'
                        className='edit_input'
                        type="text" />
                    </label>
                    <label htmlFor="ytb" className='edit_label'>
                        Youtube
                        <input 
                        id='ytb'
                        className='edit_input'
                        type="text" />
                    </label>
                    <label htmlFor="tiktok" className='edit_label'>
                        TikTok
                        <input 
                        id='tiktok'
                        className='edit_input'
                        type="text" />
                    </label>

                    <button className='col-span-2 text-white p-2 rounded-md font-semibold bg-green-600'>Save changes</button>
                </form>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default EditProfile