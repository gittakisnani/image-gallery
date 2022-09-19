import Link from "next/link"

const Logo = () => {
  return (
    <Link href='/'>
      <a>
      <h2 className='text-xl md:text-2xl hover:text-gray-500 transitions'>Taki<span className='font-semibold'>Snani</span></h2>
      </a>
    </Link>
  )
}

export default Logo