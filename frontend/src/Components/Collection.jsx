import React, { useState } from 'react'
import { products } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import Lottie from 'lottie-react'
import Camel from '../Components/animation/Camel.json'

const Collection = () => {

    const [products, setProducts] = useState([])
    const [login, setLogin] = useState(false)
    const [filters, setFilters] = useState({
        category: [],
        FormData: '',
    })

    const onSearch = (e) => {
        let { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    const handleFilter = (e) => {
        const { name, value, checked } = e.target
        setFilters(prev => ({ ...prev, [name]: checked ? [...prev[name], value] : prev[name].filter(v => v !== value) }))
    }

    const filtered = products.filter(p => {
        const filterGender = filters.category.length === 0 || filters.category.includes(p.category)
        const filterSearch = p.product.toLowerCase().includes(filters.FormData.toLowerCase())
        return filterGender && filterSearch
    })

    useEffect(() => {
        setLogin(true)
        axios.get('http://localhost:4000/ecommerce/show')
            .then((res) => {
                setProducts(res.data)
                setLogin(false)
            })
            .catch((err) => {
                console.log("Error =>", err)
            })
    }, [])

    if (login) {
        return <div className='flex min-h-[45vh] items-center justify-center'>
            <Lottie animationData={Camel} loop={true} className='w-40' />
        </div>
    }

    return (
        <div className='w-10/12 mx-auto mt-10 flex flex-col md:flex-row gap-10'>

            <div className='md:w-1/4 hidden md:block'>
                <h3 className='text-2xl mb-3 mt-4'>FILTERS</h3>
                <div className='border p-5 mb-4'>
                    <p className='font-semibold'>Category</p>
                    {['Men', 'Women', 'Kids'].map(gender => (
                        <label key={gender} className='block'>
                            <input type='checkbox' name='category' value={gender} onChange={handleFilter} className='mr-2 mt-3' />
                            {gender}
                        </label>
                    ))}
                </div>
            </div>

            <div className='w-full'>

                <div className='flex flex-col gap-4 md:flex-row items-center justify-between'>
                    <div className='text-3xl mb-5'>
                        <span className='text-gray-500'>ALL</span>{' '}
                        <span className='text-gray-700'>Collections</span>
                    </div>
                    <div className='mb-3'>
                        <input type="search" placeholder='Search products...' name='FormData' value={filters.FormData} onChange={onSearch} className='border px-3 py-1 outline-none' />
                        <button className='bg-rose-300 px-3 py-1 border border-gray-500 text-white'>Search</button>
                    </div>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {filtered.map(product => (
                        <Link to={`/product/${product._id}`}
                            onClick={() => window.scrollTo({ top: 0 })}
                            key={product._id}>
                            <div className='w-full'>
                                <img src={product.image[0]} alt={product.product} className='h-auto w-full' />
                                <p className='text-gray-500'>{product.product}</p>
                                <p>₹{product.price}</p>
                            </div>
                        </Link>
                    ))}
                    {filtered.length === 0 && <p>No matching products found.</p>}
                </div>
            </div>
        </div>
    )
}

export default Collection
