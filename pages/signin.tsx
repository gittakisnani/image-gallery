import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState, SyntheticEvent } from 'react'
import Container from '../components/Container'
import Logo from '../components/Logo'
import { AiFillFacebook, MdError } from '../components/Icons'
import BG from '../public/assets/BG.webp'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from '../utils/axios'
import Loading, { LoadingText } from '../components/Loading'


const Login = () => {
    const router = useRouter()

    const emailRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [loadingText, setLoadingText] = useState<LoadingText>()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if(![emailRef, pwdRef].every(el => el.current!.value)) {
            return setErrMsg('Both fields are required.')
        }

        if(pwdRef.current!.value.length < 8) {
            return setErrMsg('Password too short')
        }

        try{
            setErrMsg('');
            setLoading(true);
            setLoadingText('Signing in')

            const { data } = await axios.post('sessions/create', {
                email: emailRef.current!.value,
                password: pwdRef.current!.value
            })

            if(data?.issues?.length && data.issues[0].code === 'too_small') throw new Error('Password too short');

            [pwdRef, emailRef].forEach(el => el.current!.value = '');
            router.push('/')
        } catch(err: any) {
            console.error(err)
            setErrMsg(err?.response?.data?.message || err?.message || 'Login failed')
        } finally {
            setLoading(false);
            setLoadingText('Loading')
        }
    }

  return (
    <>
    <Head>
        <title>TakiSnani | Sign In</title>
        <meta name="description" content="Sign in page" />
    </Head>
    <main className='min-h-screen relative '>
            {loading && <div className='fixed bg-black/10 text-white inset-0 flex items-center justify-center'>
                <div className='absolute max-w-[400px] w-[70%] bg-white text-black p-4 rounded-md font-semibold text-xl'>
                    <Loading text={loadingText} />
                </div>
            </div>}
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
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
                        {errMsg && <p className='text-red-600 text-left flex gap-2 items-center font-semibold'>
                        <span className='text-xl'><MdError /></span>
                        {errMsg}
                        </p>}
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