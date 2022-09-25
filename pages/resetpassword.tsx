import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Container from '../components/Container'
import Logo from '../components/Logo'
import { MdError } from '../components/Icons'
import Image from 'next/image'
import BG from '../public/assets/BG.webp'
import { NextPage } from 'next'

const ResetPassword: NextPage = () => {
  return (
    <>
    <Head>
        <title>TakiSnani | Reset Password</title>
        <meta name="description" content="Reset password page" />
    </Head>
    <main className='h-screen relative'>
        <div className='absolute inset-0 -z-10 opacity-60'>
            <Image src={BG} alt='Register Background' layout='fill' />
        </div>
        <Container className='p-4 flex flex-col gap-10 h-full'>
            <div className='flex items-center justify-between'>
                <Logo />
                <div className='flex items-center gap-2'>
                    Already have account?
                    <Link href='/signin'>
                        <a className='p-2 rounded-md text-white font-semibold bg-green-600'>Sign in</a>
                    </Link>
                </div>
            </div>
            <div className='flex-1 flex justify-center items-center'>
                <form className='p-4 rounded-md flex flex-col gap-4 w-full max-w-[500px] text-center border bg-white'>
                    <h3 className='text-2xl md:text-4xl font-semibold'>Reset your password</h3>
                    <label htmlFor='resetPwd' className='w-full'>
                        <input 
                        id='resetPwd'
                        type="email" 
                        className='form_input'
                        placeholder='Email'
                        />
                    </label>
                    <p className='text-red-600 text-left flex gap-2 items-center font-semibold'>
                        <span className='text-xl'><MdError /></span>
                        Not a valid email
                    </p>
                    <button className='p-2 rounded-md text-lg font-semibold bg-green-600/80 transitions hover:bg-green-600 w-full text-white'>Send email</button>
                </form>
            </div>
        </Container>
    </main>
    </>
  )
}

export default ResetPassword