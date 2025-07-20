import React, { useContext, useState } from 'react'
import stripe from '../assets/stripe_logo.png'
import razorPay from '../assets/razorpay_logo.png'
import { useNavigate } from 'react-router-dom'
import { CartContext } from './Context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'
import Lottie from 'lottie-react'
import load from '../Components/animation/load.json'


const CheckOut = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        street: '',
        state: '',
        city: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const { product, setProduct, payment, setPayment } = useContext(CartContext)
    const SubTotal = product.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    const shippingFee = SubTotal > 0 ? 10 : 0
    const total = SubTotal + shippingFee


    const inputHandler = (e) => {
        let { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (product.length === 0) {
            setLoading(true);
            toast.error("Cart is empty");
            console.log("Submit triggered");
            return;
        }

        const dataToSend = {
            ...formData,
            cart: product,
            paymentMethod: payment,
            subTotal: SubTotal,
            shippingFee: shippingFee,
            totalAmount: total
        };

        try {
            await axios.post('https://e-commerce-zjcb.onrender.com/ecommerce/customer', dataToSend, {
                withCredentials: true
            });
            localStorage.removeItem('product');
            setProduct([]);
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                street: '',
                state: '',
                city: '',
                zipcode: '',
                country: '',
                phone: ''
            });
            toast.success('Order Placed');
            navigate('/order');
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Order failed";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div className='flex min-h-[45vh] items-center justify-center'>
        <Lottie animationData={load} loop={true} className='w-10' />
    </div>

    return (
        <div className='w-10/12 mx-auto mt-10'>
            <h2 className='text-3xl'>
                <span className='text-gray-500'>DELIVERY</span>
                <span> INFORMATION</span>
            </h2>
            <form onSubmit={onSubmit} className='flex flex-col gap-10 items-center lg:flex-row lg:gap-80'>
                <div className='w-full'>
                    <div className='flex gap-4 mt-4  '>
                        <div className='w-full'>
                            <input type="text" placeholder='First Name' name='firstname' value={formData.firstname} onChange={inputHandler} className='border w-full rounded px-3 py-2' required />
                        </div>
                        <div className='w-full'>
                            <input type="text" placeholder='Last Name' name='lastname' value={formData.lastname} onChange={inputHandler} className='border w-full rounded px-3 py-2' required />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <input type="email" placeholder='Enter Email' name='email' value={formData.email} onChange={inputHandler} className='border w-full rounded px-3 py-2' required />
                    </div>
                    <div className='mt-4'>
                        <input type="text" placeholder='Enter Street' name='street' value={formData.street} onChange={inputHandler} className='border w-full rounded px-3 py-2' required />
                    </div>
                    <div className='flex gap-4 mt-4  '>
                        <div className='w-full'>
                            <input type="text" placeholder='Enter City' name='city' value={formData.city} onChange={inputHandler} className='border w-full rounded px-3 py-2' required />
                        </div>
                        <div className='w-full'>
                            <input type="text" placeholder='Enter State' name='state' value={formData.state} onChange={inputHandler} className='border w-full rounded px-3 py-2' required />
                        </div>
                    </div>
                    <div className='flex gap-4 mt-4  '>
                        <div className='w-full'>
                            <input type="number" placeholder='Zipcode' name='zipcode' value={formData.zipcode} onChange={inputHandler} className='border w-full rounded px-3 py-2' required />
                        </div>
                        <div className='w-full'>
                            <input type="text" placeholder='Country' name='country' value={formData.country} onChange={inputHandler} className='border w-full rounded px-3 py-2' required />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <input type="number" placeholder='Phone' name='phone' value={formData.phone} onChange={inputHandler} className='border w-full rounded px-3 py-2' required />
                    </div>
                </div>

                <div className='w-full'>
                    <h2 className='text-3xl'>
                        <span className='text-gray-500'>CART</span>
                        <span className='text-gray-700'> TOTAL</span>
                    </h2>
                    <div className='border-b border-gray-300 flex justify-between mt-4'>
                        <p>SubTotal</p>
                        <p>${SubTotal.toFixed(2)}</p>
                    </div>
                    <div className='border-b border-gray-300 flex justify-between mt-4'>
                        <p>Shipping Fee</p>
                        <p>${shippingFee.toFixed(2)}</p>
                    </div>
                    <div className=' flex justify-between mt-4'>
                        <p>Total</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                    <h2 className='text-1xl mt-10'>
                        <span className='text-gray-500'>PAYMENT</span>
                        <span className='text-gray-900'> METHOD</span>
                    </h2>
                    <div className='flex items-center gap-5'>
                        <div onClick={() => setPayment('Stripe')} className='border px-3 py-2 rounded flex flex-col md:flex-row justify-between items-center gap-1 cursor-pointer'>
                            <p className={`${payment === 'Stripe' ? 'h-3 w-3 bg-green-400 rounded-full' : ''}`}></p>
                            <img src={stripe} alt="" className='w-25 h-5' />
                        </div>
                        <div onClick={() => setPayment("Razorpay")} className='border px-3 py-2 rounded flex flex-col md:flex-row justify-between items-center gap-1 cursor-pointer'>
                            <p className={`w-1/2 ${payment === 'Razorpay' ? 'h-3 w-3 bg-green-400 rounded-full' : ''}`}></p>
                            <img src={razorPay} alt="" className='w-25 h-5' />
                        </div>
                        <div onClick={() => setPayment('COD')} className='border px-3 py-1.5 rounded flex flex-col md:flex-row justify-between items-center gap-1 cursor-pointer'>
                            <p className={`w-1/2 ${payment === 'COD' ? 'h-3 w-3 bg-green-400 rounded-full' : ''}`}></p>
                            <p className='w-10'>COD</p>
                        </div>
                    </div>

                    <button type="submit" className='bg-black text-white py-2 px-10 mt-2'>
                        {loading ? 'Placing Order...' : 'Place your order'}
                    </button>
                </div>
            </form>
        </div>

    )
}

export default CheckOut
