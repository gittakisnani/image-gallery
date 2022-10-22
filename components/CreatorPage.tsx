import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import Container from './Container'
import { FiUserPlus, MdOutlineLanguage, AiOutlineUp, AiOutlineDown, AiOutlineCheck, MdModeEdit, BiImages} from './Icons'
const CreatorPage = () => {
    const { width } = useWindowSize()
    const [sort, setSort] = useState<'Recency' | 'Popularity'>('Popularity');
    const [showSort, setShowSort] = useState(false)

    const handleShowSort = () => setShowSort(!showSort);

    const handleSort = (sortMethod: typeof sort) => {
        setSort(sortMethod);
        setShowSort(false)
    }
  return (
    <section className='bg-white'>
        <Container className='px-4 md:px-6 py-10'>
            <div className='flex flex-col items-center'>
            <div className='h-[120px] md:h-[180px] w-[120px] md:w-[180px] rounded-full overflow-hidden'>
                <Image src="https://images.pexels.com/users/avatars/52023188/elina-volkova-981.jpeg?auto=compress&fit=crop&h=180&w=180&dpr=1" alt='Creator' width='180px' height="180px" />
            </div>
            <h2 className='text-slate-900 text-2xl md:text-5xl font-semibold my-6'>John Doe</h2>
            <button title='Follow John Doe' className='bg-green-600 p-2 rounded-md font-semibold text-lg text-white'>
                {width! >= 768 ? <span className='flex items-center gap-2'> <MdModeEdit size='25px' />Edit Profile</span> : <FiUserPlus />}
            </button>
            <p className='text-center my-6 max-w-[500px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, suscipit?.</p>
            <div className='flex items-center gap-2'>
                <Link href="/">
                    <a className='text-gray-500 text-xl' title='Website'>
                        <MdOutlineLanguage />
                    </a>
                </Link>
            </div>
            <div className='my-6 flex items-center text-slate-900 text-center gap-10'>
                <div>
                    <p>Total views</p>
                    <p className='text-xl font-semibold'>27M</p>
                </div>
                <div>
                    <p>Pictures Posted</p>
                    <p className='text-xl font-semibold'>181</p>
                </div>
            </div>
            </div>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
                <div className='flex gap-2 items-center'>
                    <Link href="/">
                        <a className='font-semibold rounded-md p-2 current__creator__button'>Photos <span className='text-gray-500'>656</span></a>
                    </Link>
                    <Link href="/">
                        <a className='font-semibold rounded-md p-2'>Collections <span className='text-gray-500'>656</span></a>
                    </Link>
                    <Link href="/">
                        <a className='font-semibold rounded-md p-2'>Followers <span className='text-gray-500'>656</span></a>
                    </Link>
                    <Link href="/">
                        <a className='font-semibold rounded-md p-2'>Following <span className='text-gray-500'>656</span></a>
                    </Link>
                </div>
            <div onClick={handleShowSort} className='p-2 text-lg rounded-md  border border-gray-200 hover:border-gray-400 flex items-center gap-2 justify-between relative transitions min-w-[140px] bg-white'>
                {sort}
                <span>{showSort ? <AiOutlineUp /> : <AiOutlineDown />}</span>
                {showSort && <ul className='absolute top-[140%] bg-inherit flex flex-col p-2 rounded-md z-20 w-full shadow-xl shadow-gray-500'>
                   {['Recency', 'Popularity'].map((el, index) => (
                     <li onClick={() => handleSort(el as typeof sort)} key={index} className='navbar__li w-full flex items-center justify-between p-2'>
                        {el}
                        <span>{sort === el ? <AiOutlineCheck /> : ""}</span>
                     </li>
                   ))}
                </ul>}
            </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10'>
            </div>
        </Container>
    </section>
  )
}

export default CreatorPage