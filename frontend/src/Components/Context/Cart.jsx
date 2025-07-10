import React, { useContext } from 'react'
import { CartContext } from './Context'
import bin from '../../assets/bin_icon.png'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Cart = () => {
    const { product, setProduct } = useContext(CartContext)
    const Cookie = document.cookie.includes('token') ? 'token' : null

    const total = product.reduce((acc, cur) => {
        const price = Number(cur.price) || 0
        const quantity = Number(cur.quantity) || 1
        return acc + price * quantity
    }, 0);

    const shippingFee = total > 0 ? 10 : 0
    const subTotal = total + shippingFee

    const del = (id, size) => {
        const del = product.filter((item) => !(item._id === id && item.selectedSize === size))
        setProduct(del)
    }

    const updateQuantity = (id, size, value) => {
        const updated = product.map(item => {
            if (item._id === id && item.selectedSize === size) {
                return { ...item, quantity: value };
            }
            return item;
        });
        setProduct(updated);
    };


    return (
        <div className='w-11/12 md:w-10/12 min-h-[80vh] mx-auto '>
            <h3 className='text-4xl mt-10 mb-10'>
                <span className='text-gray-500'>YOUR</span>
                <span className='text-gray-700'> CART</span>
            </h3>
            <div className=''>
                {product.map((item) => (
                    <div key={item._id} className='flex justify-between items-center gap-6 border-y border-gray-300 p-4'>
                        <div className='flex items-center gap-5 w-1/2'>

                            <img src={item.image[0]} alt={item.product} className='w-20' />

                            <div >
                                <p className='text-xs'>{item.product}</p>
                                <div className='flex  sm:flex-row gap-6 mt-10 items-center'>
                                    <p className='font-bold'>${item.price}</p>
                                    <div className='border border-gray-300 px-3 py-1 bg-gray-100'>
                                        {item.selectedSize}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="number" onChange={(e) => updateQuantity(item._id, item.selectedSize, e.target.value)} placeholder='1' value={item.quantity} min={1} className='border border-gray-6 w-15 sm:w-30 border-gray-400 px-3 py-2 outline-none' />
                        <button onClick={() => del(item._id, item.selectedSize)}>
                            <img src={bin} alt="img" className='h-5 cursor-pointer' />
                        </button>
                    </div>
                ))}
            </div>

            <div className='w-full md:w-1/3 text-right'>
                <h3 className='text-4xl mt-10 mb-10 '>
                    <span className='text-gray-500'>Cart</span>
                    <span className='text-gray-700'> Total</span>
                </h3>
                <div className='border-b border-gray-300 flex justify-between mt-4'>
                    <p>SubTotal</p>
                    <p>${total.toFixed(2)}</p>
                </div>
                <div className='border-b border-gray-300 flex justify-between mt-4'>
                    <p>Shipping Fee</p>
                    <p>${shippingFee.toFixed(2)}</p>
                </div>
                <div className=' flex justify-between mt-4'>
                    <p>Total</p>
                    <p>${subTotal.toFixed(2)}</p>
                </div>
                {Cookie ? <Link to={'/checkout'}>
                    <button className='px-8 py-2 bg-black text-white mt-5'>
                        PROCEED TO CHECKOUT
                    </button>
                </Link> : <Link to={"/login"}>
                    <button className='px-8 py-2 bg-black text-white mt-5'>Go And Login First</button></Link>}
            </div>
        </div>
    )
}

export default Cart