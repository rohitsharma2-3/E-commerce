import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BestSeller = () => {
    const [products, setproducts] = useState([])

    useEffect(() => {
      axios.get('http://localhost:4000/ecommerce/show')
      .then((res) => {
        setproducts(res.data)
      })
    }, [])
    
    return (
        <div className='w-11/12 mx-auto mt-16'>
            <div>
                <h3 className='text-4xl text-center'>
                    <span className='text-gray-500'>BEST</span>
                    <span className='text-gray-800'> SELLERS</span>
                    <p className='w-3/4 md:w-3/5 text-[13px] md:text-[15px] mx-auto leading-snug mt-4 text-gray-500'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
                </h3>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-10 w-11/12 mx-auto'>
                {products.slice(11, 16).map((product) => {
                    return (
                        <Link to={`/product/${product._id}`}
                            onClick={() => window.scrollTo({ top: 0 })}
                            key={product._id}> <div>
                                <img src={product.image} alt="image" className='w-full object-cover transition-transform duration-200 hover:scale-101' />
                                <p className='text-gray-500 text-[13px]'>{product.product}</p>
                                <p className='text-gray-700'>${product.price}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default BestSeller