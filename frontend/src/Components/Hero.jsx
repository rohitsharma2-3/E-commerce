import React from 'react'
import HeroImg from '../assets/hero_img.png'

const Hero = () => {
    return (
        <div className='border-b border-x border-gray-500 w-11/12 md:w-10/12 mx-auto'>
            <div className='flex flex-col md:flex-row items-center'>
                <div className='h-52 md:min-h-130 flex w-full md:w-1/2 flex-col justify-center items-center'>
                    <div className='leading-[30px]'>
                        <div className='flex items-center gap-2'>
                            <p className='w-8 md:w-11 h-[2px] bg-gray-700'></p>
                            <p className='text-1xl'>OUR BESTSELLERS</p>
                        </div>
                        <h3 className='text-3xl md:text-5xl text-gray-700'>Latest Arrivals</h3>
                        <div className='flex items-center gap-2'>
                            <p className='mt-1'>SHOP NOW </p>
                            <p className='w-8 md:w-11 h-[2px] bg-gray-700'></p>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-1/2 h-64 md:h-[520px]'>
                    <img src={HeroImg} alt="hero" className='w-full h-full object-cover' />
                </div>

            </div>
        </div>
    )
}

export default Hero