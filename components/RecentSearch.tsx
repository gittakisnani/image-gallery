import Link from "next/link"
import { BsSearch } from './Icons'
const RecentSearch = ({ text } : { text: string }) => {
  return (
    <Link href={`/search/${text}`}>
        <a className="p-2 rounded-md border border-gray-100 hover:border-gray-400 transitions flex items-center gap-2 text-gray-400 hover:text-gray-500">
            {text}
            <span><BsSearch /></span>
        </a>
    </Link>
  )
}

export default RecentSearch