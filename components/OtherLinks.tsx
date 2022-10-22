import Link from 'next/link'
import React from 'react'
import{ Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import useWindowSize from '../hooks/useWindowSize';
const OtherLinks = () => {
    const { width } = useWindowSize()
  return (
    <div className='flex gap-2 items-center w-full h-[70px] overflow-hidden'>
        <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={50}
        slidesPerView={Math.floor(width! / 150)}
        className='!px-10 !h-full'
        >
            {Array(20).fill('beach').map(( more, index ) => (
                <SwiperSlide className='flex items-center' key={index}>
                    <Link key={index} href={`/search/${more}`}>
                        <a className='more capitalize'>{more}</a>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default OtherLinks