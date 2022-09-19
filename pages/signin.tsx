import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Container from '../components/Container'
import Logo from '../components/Logo'
import { AiFillFacebook, MdError } from '../components/Icons'
import BG from '../public/assets/BG.webp'
import Image from 'next/image'
const Login = () => {
  return (
    <>
    <Head>
        <title>TakiSnani | Sign In</title>
    </Head>
    <main className='min-h-screen relative '>
        <div className='absolute inset-0 -z-10 opacity-60'>
            <Image src={BG} alt='Register Background' layout='fill' />
        </div>
        <Container className='p-4 flex flex-col gap-10 h-full'>
            <div className='flex items-center justify-between'>
                <Logo />
                <div className='flex items-center gap-2'>
                    Not a member?
                    <Link href='/register'>
                        <a className='p-2 rounded-md text-white font-semibold bg-green-600'>Join</a>
                    </Link>
                </div>
            </div>
           <div className='flex-grow flex justify-center items-center'>
           <div className='max-w-[400px] bg-white rounded-md p-4 border'>
                    <h1 className='text-2xl md:text-4xl font-semibold text-center'>
                        Welcome back to our community
                    </h1>
                    <p className='text-gray-400 text-center my-4'>Take your photography to the next level. Get it seen by millions</p>


                    <button className='w-full p-2 flex gap-2 items-center bg-[#4267B2]/90 hover:bg-[#4267B2] transitions text-lg text-white'>
                        <span className='text-3xl'><AiFillFacebook /></span>
                        <p className='font-semibold'>Register with facebook</p>
                    </button>

                    <p className='text-center text-xl my-4'>OR</p>
                    <form action='/hahaha' className='flex flex-col gap-4'>
                        <label htmlFor="email" className='w-full'>
                            <p className='offscreen'>Email</p>
                            <input
                            id='email' 
                            type="email" 
                            className='form_input'
                            placeholder='Email'
                            />
                        </label>
                        <label htmlFor="pwd" className='w-full'>
                            <p className='offscreen'>Password</p>
                            <input
                            id='pwd' 
                            type="password" 
                            className='form_input'
                            placeholder='Password'
                            />
                        </label>
                        <p className='text-red-600 text-left flex gap-2 items-center font-semibold'>
                        <span className='text-xl'><MdError /></span>
                        Not a valid email
                        </p>
                        <button className='p-2 bg-green-600/80 transitions hover:bg-green-600 text-white w-full font-semibold rounded-md'>Login</button>
                        <Link href='/resetpassword'>
                            <a className='text-gray-500 text-sm transitions hover:underline underline-offset-2 text-right'>
                            Forgot password?
                            </a>
                        </Link>
                    </form>
            </div>
           </div>
        </Container>
    </main>
    </>
  )
}

export default Login