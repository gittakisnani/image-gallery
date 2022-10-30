import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { User } from '../pages/edit-profile'
import fetcher from '../utils/fetcher';

const FollowUser = ({ userId }: { userId: string }) => {
    const [user, setUser] = useState<User | null>();
    useEffect(() => {
        const findUser = async () => {
            try {
                const followUser = await fetcher<User>(`users/${userId}`)
                setUser(followUser)
            } catch(err) {
                console.log(err)
            }
        }

        findUser()
    }, [userId])
  return (
    <Link href={`/creator/${userId}`}>
        <a>
        <li className='flex gap-2 items-center p-2 cursor-pointer'>
            <div className='h-12 w-12 rounded-full overflow-hidden'>
                <Image src={user?.picture!} alt={user?.firstName}  width='48px' height='48px' />
            </div>
            <p className='text-xl fond-semibold'>{user?.firstName} {user?.lastName}</p>
        </li>
        </a>
    </Link>
  )
}

export default FollowUser