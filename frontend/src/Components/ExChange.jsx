import React from 'react'
import ExchangeOffer from './ExchangeOffer'
import ExChangeImg from '../assets/exchange_icon.png'
import Support from '../assets/support_img.png'
import Quality from '../assets/quality_icon.png'

const ExChange = () => {
    return (
        <div className='flex flex-col gap-10 md:flex-row justify-between items-center mt-30 w-11/12 md:w-8/12 mx-auto'>
            <ExchangeOffer image={ExChangeImg} title='Easy Exchange Policy' para='We offer hassle free exchange policy' />
            <ExchangeOffer image={Quality} title='7 Days Return Policy' para='We provide 7 days free return policy' />
            <ExchangeOffer image={Support} title='Best customer support' para='We provide 24/7 customer support' />
        </div>
    )
}

export default ExChange