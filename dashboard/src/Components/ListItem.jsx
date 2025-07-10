import React from 'react'
import bin from '../assets/cross_icon.png'
import { useState, useEffect } from 'react'
import axios from 'axios'


const ListItem = () => {
    const [product, setproduct] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/ecommerce/show')
            .then((res) => {
                setproduct(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const deleteButton = (id) => {
        axios.delete(`http://localhost:4000/ecommerce/delete/${id}`)
        .then(() => {
            setproduct(prev => prev.filter(product => product._id !== id))
        })
    }

    return (
        <div className='w-9/12 mx-auto py-5'>
            <h1 className='text-2xl text-gray-700'>All Products List</h1>
            <div className='flex justify-between border p-1 bg-gray-100 text-gray-600 font-bold mt-4 pr-10'>
                <p >Image</p>
                <p className='w-1/5'>Name</p>
                <p className='w-1/5'>Category</p>
                <p className='w-1/5'>Price</p>
                <p >Action</p>
            </div>
            <div>
                {product.map((item, i) => {
                    return <div className='border border-gray-300 mb-2 text-gray-600 mt-2 p-2 flex justify-between items-center pr-10' key={i}>
                        <img src={item.image[0]} alt="" className=' h-13' />
                        <p className='w-1/5'>{item.product}</p>
                        <p className='w-1/5'>{item.category}</p>
                        <p className='w-1/5'>${item.price}</p>
                        <button onClick={() => deleteButton(item._id)} ><img src={bin} alt="img" className='w-5 h-5' /></button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ListItem

