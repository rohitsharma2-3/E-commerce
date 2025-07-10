import React, { useEffect, useState } from 'react'
import { products } from '../assets/assets.js'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LatestCollections = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
      axios.get('http://localhost:4000/ecommerce/show')
      .then((res) => {
        setProducts(res.data)
      })
    }, [])
    
    return (
        <div className='w-11/12 mx-auto mt-20'>
            <div className='text-center text-4xl'>
                <span className='text-gray-500'>LATEST</span>
                <span className='text-gray-700 font-bold'> COLLECTIONS</span>
                <p className='text-[12px] md:text-[15px] w-3/4 mx-auto text-gray-600 mt-4 leading-snug'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10 w-11/12 mx-auto'>
                {products.splice(0,10).map((products) => {
                    return (
                        <Link to={`/product/${products._id}`}
                            onClick={() => window.scrollTo({ top: 0})}
                            key={products._id}>
                            <div className='overflow-hidden'>
                                <img src={products.image[0]} alt="image" className='w-full object-cover transition-transform duration-200 hover:scale-101' />
                                <p className='text-gray-500 text-[13px]'>{products.product}</p>
                                <p className='text-gray-700'>${products.price}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default LatestCollections