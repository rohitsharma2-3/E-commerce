import React from 'react'
import Lottie from 'lottie-react'
import Error from '../Components/animation/Error.json'

const Erro = () => {
  return (
    <div className='flex items-center justify-center mt-20'>
        <Lottie animationData={Error} loop={true} className='w-[65%]' />
    </div>
  )
}

export default Erro