import Link from 'next/link'
import React from 'react'
import Container from '../components/Container'
import Logo from '../components/Logo'
import { AiFillFacebook, MdError } from '../components/Icons'
import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next'
import BG from '../public/assets/BG.webp'
import Image from 'next/image'
import useSWR from 'swr'
import { useSWRHandler } from 'swr/dist/use-swr'
import fetcher from '../utils/fetcher'
import getGoogleOAuthURL from '../utils/getGoogleUrl'

interface User {
    _id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    session: string;
    iat: number;
    exp: number;
}
const Register: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
    const { data } = useSWR<User | null>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
        fetcher,
        { fallbackData }
      );

      if (data) {
        return <div>Welcome! {data.name}</div>;
      }

      // return (
      //   <div>
      //     <a href={getGoogleOAuthURL()}>Login with Google</a>
      //     Please login
      //   </div>
      // );
    return (
        <>
        <Head>
            <title>TakiSnani | Register</title>
        </Head>
        <main className='h-screen relative w-screen'>
            <div className='absolute inset-0 -z-10 opacity-60'>
                <Image src={BG} alt='Register Background' layout='fill' />
            </div>
            <Container className='p-4 flex flex-col gap-10 h-full'>
                <div className='flex items-center justify-between'>
                    <Logo />
                    <div className='flex items-center gap-2'>
                        Have an account?
                        <Link href='/signin'>
                            <a className='p-2 rounded-md text-white font-semibold bg-green-600'>Sign in</a>
                        </Link>
                    </div>
                </div>
               <div className='flex-grow flex justify-center items-center w-full'>
               <div className='max-w-[400px] bg-white rounded-md p-4 border max-h-[550px] overflow-y-auto'>
                        <h1 className='text-2xl md:text-4xl font-semibold text-center'>
                            Join our community
                        </h1>
                        <p className='text-gray-400 text-center my-4'>Take your photography to the next level. Get it seen by millions</p>
    
    
                        <button className='w-full p-2 flex gap-2 items-center bg-[#4267B2]/90 hover:bg-[#4267B2] transitions text-lg text-white'>
                            <span className='text-3xl'><AiFillFacebook /></span>
                            <p className='font-semibold'>Register with facebook</p>
                        </button>
    
                        <p className='text-center text-xl my-4'>OR</p>
                        <form action='/hahaha' className='flex flex-col gap-4'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <label htmlFor="fName">
                                <p className='offscreen'>First name</p>
                                <input 
                                id='fName'
                                type="text" 
                                className='form_input'
                                placeholder='First name'
                                />
                            </label>
                            <label htmlFor="lName">
                                <p className='offscreen'>First name</p>
                                <input 
                                id='lName'
                                type="text" 
                                className='form_input'
                                placeholder='Last name (opt)'
                                />
                            </label>
                            </div>
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
                            <button className='p-2 bg-green-600/80 transitions hover:bg-green-600 text-white w-full font-semibold rounded-md'>Create account</button>
                            <p className='text-gray-500 text-sm'>
                            By joining, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </form>
                </div>
               </div>
            </Container>
        </main>
        </>
      )
    };
    
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const data = await fetcher(
//     `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
//     context.req.headers
//   );

//   return { props: { fallbackData: data } };
// };
    


  

export default Register