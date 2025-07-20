import React, { useContext, useState } from 'react'
import Description from './Description.jsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { CartContext } from './Context/Context.jsx'


const ProductDetail = () => {
    const { product, setProduct } = useContext(CartContext)
    const { id } = useParams()
    const [products, setProducts] = useState(null)
    const [mainImage, setMainImage] = useState('')
    const [selectedSize, setSelectedSize] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:4000/ecommerce/show/${id}`)
            .then((res) => {
                setProducts(res.data)
                setMainImage(res.data?.image[0])
            })
            .catch((err) => {
                console.log("Error =>", err)
            })
    }, [id])

    if (!products) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold text-gray-600">Loading product details...</p>
            </div>
        );
    }

    return (
        <div className='w-10/12 mx-auto'>
            <div className='pt-10 flex flex-col lg:flex-row gap-10 '>
                <div className="flex flex-col-reverse md:flex-row gap-4">
                    {/* Side images */}
                    <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible hide-scrollbar">
                        {products.image.map((img, i) => (
                            <img
                                src={img}
                                alt='img'
                                key={i}
                                onClick={() => setMainImage(img)}
                                className="h-24 w-24 shadow-md mb-1 object-cover rounded-md cursor-pointer"
                            />
                        ))}
                    </div>


                    {/* Main Image */}
                    <div className="w-full md:w-3/4">
                        <img
                            src={mainImage}
                            alt="Main product"
                            className="w-full h-auto rounded-md shadow-md"
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className='w-2/2 lg:w-1/2'>
                    <h3 className='text-2xl'>{products.product}</h3>
                    <p className='mt-3 font-bold'>${products.price}</p>
                    <p className='mt-3 text-gray-500'>{products.description}</p>

                    <p className='text-gray-600 mt-5'>Select Size</p>
                    <div className='flex gap-3 mt-3'>
                        {products.size?.map((size, i) => (
                            <button
                                key={i}
                                className={`border px-5 py-2 rounded-md ${selectedSize === size
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-400 bg-gray-100'
                                    }`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    <button
                        className='mt-5 px-10 py-4 bg-black text-white'
                        onClick={() => {
                            if (!selectedSize) {
                                toast.error("Please select a size")
                                return
                            }
                            const newItem = { ...products, selectedSize, quantity: 1 }
                            setProduct((prev) => [...prev, newItem])
                            toast.success("Added to cart!")
                        }}>
                        Add To Cart
                    </button>

                    <hr className='mt-10' />
                    <div className='text-gray-700 mt-10'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery available on the product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            <Description />
        </div>
    )
}

export default ProductDetail
