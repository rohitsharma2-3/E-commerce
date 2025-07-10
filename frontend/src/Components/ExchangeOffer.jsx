import React from 'react'

const ExchangeOffer = ({ image, title, para }) => {
    return (
        <div className='flex flex-col items-center '>
            <img src={image} alt="" className='w-13' />
            <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
            <p className='text-sm text-gray-500'>{para}</p>
        </div>
    )
}

export default ExchangeOffer