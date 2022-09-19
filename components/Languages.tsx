// We provide two languages

import Image from 'next/image'
import React from 'react'

const Languages = ({ setLanguages }: { setLanguages: (value: boolean) => void}) => {
  return (
    <ul className='flex-col w-[200px] flex gap-2 md:absolute top-[160%] bg-inherit md:bg-white p-4 rounded-md'>
        <li onClick={() => setLanguages(false)} className='flex navbar__li items-center gap-2 p-2'>
            {/* Name of the language and its flag */}
            <div>
            <Image src={"https://flagsapi.com/US/flat/64.png"} width='40px' height='40px' alt='English' />
            </div>
            <p>EN</p>
        </li>
        <li onClick={() => setLanguages(false)} className='flex navbar__li items-center gap-2 p-2'>
            {/* Name of the language and its flag */}
            <div>
            <Image src={"https://flagsapi.com/FR/flat/64.png"} width='40px' height='40px' alt='English' />
            </div>
            <p>FR</p>
        </li>
    </ul>
  )
}

export default Languages