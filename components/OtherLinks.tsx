import Link from 'next/link'
import { useRef } from 'react'
import useWindowSize from '../hooks/useWindowSize';
import{ Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { AiOutlineLeft, AiOutlineRight } from './Icons'



const OtherLinks = () => {
    const { width } = useWindowSize();
    const prevRef = useRef<HTMLSpanElement>(null);
    const nextRef = useRef<HTMLSpanElement>(null);


  return (
    <div className='flex gap-2 items-center w-full h-[70px] overflow-hidden relative'>
        <span ref={prevRef} className='absolute left-0 z-40 bg-white p-2 rounded-full text-xl cursor-pointer shadow-xl shadow-gray-300'>
            <AiOutlineLeft />
        </span>

        <span ref={nextRef} className='absolute right-0 z-40 bg-white p-2 rounded-full text-xl cursor-pointer '>
            <AiOutlineRight />
        </span>


        <Swiper
        modules={[Navigation]}
        navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
        }}
        spaceBetween={50}
        slidesPerView={width! <= 400 ? 2 : width! <= 500 ? 3 : width! <= 768 ? 4 : width! / 140}
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