import Image from 'next/image'
import Link from 'next/link'
import { Trends } from '../types/types'

const TrendTopic = ({ text, image } : Trends) => {
  return (
    <Link href={`/search/${text}`}>
        <a className='p-2 rounded-md border border-gray-200 transitions hover:border-gray-500 flex items-center gap-2'>
            <div className='w-8 h-8 rounded-full overflow-hidden'>
            <Image src={image} alt={text} />
            </div>
            <p className='capitalize'>{text}</p>
        </a>
    </Link>
  )
}

export default TrendTopic