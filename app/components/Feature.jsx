"use client"
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation'
import '../styles/styles.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

function Feature() {
    const router = useRouter();

    const features = [
        { id: 1, content: 'Pdf summariser' },
        { id: 2, content: 'Friends' },
        { id: 3, content: 'Show all pdf' },
        { id: 4, content: 'Chat with AI' }
    ];

    const handleClick = (id) => {
        router.push(`/feature/${id}`); 
    };

    return (
        <div className='h-[30vh] text-white flex'>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {features.map((feature) => (
                    <SwiperSlide key={feature.id}>
                        <div className='h-[95%] m-1 flex justify-center items-center'>
                            <div
                                className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 h-full w-[30vh] rounded-full'
                                onClick={() => handleClick(feature.id)} 
                            >
                                {feature.content}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Feature;
