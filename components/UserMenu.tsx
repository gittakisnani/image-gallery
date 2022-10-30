import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import fetcher from '../utils/fetcher'


interface UserMenuProps {
    userId: string
}


const UserMenu = ({ userId }: UserMenuProps) => {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await fetcher('sessions/logout');
            router.push('/signin')
        } catch(err) {
            console.error(err)
        }
    }
  return (
    <div className='bg-inherit w-full md:absolute md:top-[100%] md:mt-2 md:bg-white md:shadow p-4 md:rounded-md'>
        <ul className='flex gap-w flex-col text-left'>
            <Link href={`/creator/${userId}?photos`}>
                <a target='_blank'>
                <li className='p-2'>Profile</li>
                </a>
            </Link>
            <Link href='/edit-profile'>
                <a>
                <li className='p-2'>Settings</li>
                </a>
            </Link>
            <li onClick={handleLogout} className='p-2'>Logout</li>
        </ul>
    </div>
  )
}

export default UserMenu