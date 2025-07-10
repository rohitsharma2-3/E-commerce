import React, { useContext } from 'react'
import { CartContext } from './Context/Context'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Order = () => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/ecommerce/customer/show')
            .then((res) => {
                setProduct(res.data)
                console.log(res.data)
            })
    }, [])


    return (
        <div className='w-10/12 mx-auto '>
            <h3 className='text-3xl mt-10 mb-10'>
                <span className='text-gray-500'>MY</span>
                <span className='text-gray-700'> ORDER</span>
            </h3>
            {product.map((item, i) =>
                <div className='border-y border-gray-200 p-3 flex gap-10 items-center justify-between' key={i}>
                    {item.cart.map((product, i) => (
                        <div className='flex gap-3 items-center' key={i}>
                            <img src={product.image[0]} alt="image" className='w-30 p-2' />
                            <div className='flex flex-col gap-2'>
                                <p>{product.product}</p>
                                <div className='flex gap-3 text-gray-800'>
                                    <p>${product.price * product.quantity}</p>
                                    <p>Quantity: {product.quantity}</p>
                                    <p>Size: {product.selectedSize}</p>
                                </div>
                                <p>Date: <span className='text-sm text-gray-500'>{new Date(item.createdAt).toDateString()}</span></p>
                                <p>Payment: <span className="text-gray-500">{item.paymentMethod}</span></p>
                            </div>
                        </div>
                    ))}
                    <div className='flex items-center gap-4'>
                        <p className='h-3 w-3 bg-green-400 rounded-full'></p>
                        <p>Order Placed</p>
                    </div>
                    <button className='border border-gray-300 rounded px-10 py-2'>Track</button>
                </div>
            )}

        </div>
    )
}

export default Order