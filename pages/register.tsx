import Link from 'next/link'
import { SyntheticEvent, useRef, useState } from 'react'
import Container from '../components/Container'
import Logo from '../components/Logo'
import { AiFillFacebook, MdError } from '../components/Icons'
import Head from 'next/head'
import { NextPage } from 'next'
import BG from '../public/assets/BG.webp'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import axios from '../utils/axios'
import { useRouter } from 'next/router'
import Loading from '../components/Loading'


const Register: NextPage = () => {
    const router = useRouter();


    const fNameRef = useRef<HTMLInputElement>(null);
    const lNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: SyntheticEvent) => {
        e.preventDefault()
        if(![fNameRef, lNameRef, emailRef, pwdRef].every(el => el.current!.value)) {
            return setErrMsg('All fields are required')
        }


        if(pwdRef.current!.value.length < 8) {
            return setErrMsg('Password too short')
        }

        try {
            setLoading(true)
            setErrMsg('')
            const { data } = await axios.post('users/create', {
                firstName: fNameRef.current!.value,
                lastName: lNameRef.current!.value,
                email: emailRef.current!.value,
                password: pwdRef.current!.value
            })

            if(data?.issues?.length && data.issues[0].code === 'too_small') throw new Error('Password too short');

            [fNameRef, lNameRef, emailRef, pwdRef].forEach(el => el.current!.value = '')
            router.push('/')

        } catch(err: any) {
            if(err.response?.data.message) {
                setErrMsg(err.response.data.message) 
            } else if (err.message) {
                setErrMsg(err.message)
            } else {
                setErrMsg('Server error. Please try later.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <Head>
            <title>TakiSnani | Register</title>
        </Head>
        <main className='h-screen relative w-screen'>
            {loading && <div className='fixed bg-black/10 text-white inset-0 flex items-center justify-center'>
                <div className='absolute max-w-[400px] w-[70%] bg-white text-black p-4 rounded-md font-semibold text-xl'>
                    <Loading />
                </div>
            </div>}
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
                        <form onSubmit={handleRegister} className='flex flex-col gap-4'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <label htmlFor="fName">
                                <p className='offscreen'>First name</p>
                                <input 
                                autoComplete='off'
                                ref={fNameRef}
                                id='fName'
                                type="text" 
                                className='form_input'
                                placeholder='First name'
                                />
                            </label>
                            <label htmlFor="lName">
                                <p className='offscreen'>Last name</p>
                                <input 
                                autoComplete='off'
                                ref={lNameRef}
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
                                ref={emailRef}
                                id='email' 
                                type="email" 
                                className='form_input'
                                placeholder='Email'
                                />
                            </label>
                            <label htmlFor="pwd" className='w-full'>
                                <p className='offscreen'>Password</p>
                                <input
                                ref={pwdRef}
                                id='pwd' 
                                type="password" 
                                className='form_input'
                                placeholder='Password'
                                />
                            </label>
                            {errMsg && <motion.p initial={{opacity: 0}} animate={{ opacity: 1}} className='text-red-600 text-left flex gap-2 items-center font-semibold'>
                            <span className='text-xl'><MdError /></span>
                            {errMsg}
                            </motion.p>}
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

export default Register