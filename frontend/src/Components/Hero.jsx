import React from 'react'
import HeroImg from '../assets/hero_img.png'
import HeroBg from '../Components/animation/hero.json'
import Lottie from 'lottie-react'

const Hero = () => {
    return (
        <div className='border-b border-x border-gray-500 w-11/12 md:w-10/12 mx-auto'>
            <div className='flex flex-col md:flex-row items-center'>
                <div className='h-52 md:min-h-130 flex w-full md:w-1/2 flex-col justify-center items-center'>
                    <div className='leading-[30px] px-12 text-sm'>
                        <div className='flex items-center gap-2'>
                            <p className='w-8 md:w-11 h-[2px] bg-gray-700'></p>
                            <p className='text-sm md:text-3xl'>HOT PICKS</p>
                        </div>
                        <h3 className='text-sm md:text-4xl text-gray-700'>New Summer Collection</h3>
                        <div className='flex items-center gap-2'>
                            <p className=' text-sm mt-1 md:text-3xl'>SHOP NOW </p>
                            <p className='w-8 md:w-11 h-[2px] bg-gray-700'></p>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-1/2'>
                    {/* <img src={HeroImg} alt="hero" className='w-full h-full object-cover' /> */}
                    <Lottie animationData={HeroBg} loop={true} classID='w-fulll h-auto' />
                </div>

            </div>
        </div>
    )
}

export default Hero