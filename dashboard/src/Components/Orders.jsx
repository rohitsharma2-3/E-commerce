import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Orders = () => {

  const [detail, setDetail] = useState([])
  const [status, setStatus] = useState(' ')

  useEffect(() => {
    axios.get('http://localhost:4000/ecommerce/customer/show')
      .then((res) => {
        setDetail(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='w-11/12 md:w-9/12 mx-auto py-10'>
      <h1 className='text-2xl font-bold mb-4 text-gray-700'>Order Page</h1>

      {detail.map((order, index) => (
        <div key={index} className='border p-4 rounded shadow-sm space-y-4 mt-4 text-gray-700 mb-4'>

          {/* 🛒 Cart Items */}
          {order.cart.map((item, idx) => (
            <div key={idx} className='flex flex-wrap justify-between items-center gap-2'>
              <p className='font-semibold'>{item.product} x{item.quantity || 1} ({item.
                selectedSize})</p>
              <p>Items: {item.quantity || 1}</p>
              <p className='text-green-600 font-bold'>${item.price * item.quantity}</p>
              <select className='border px-2 py-1 rounded'>
                <option>Order Placed</option>
                <option>Packing</option>
                <option>Shipped</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
              </select>
            </div>
          ))}

          {/* 👤 Customer Info */}
          <div className='flex justify-between gap-2 text-sm'>
            <p>Name: <strong>{order.firstname} {order.lastname}</strong></p>
            <p>Method: {order.paymentMethod}</p>
          </div>

          {/* 💳 Payment Info */}
          <div className='flex justify-between gap-2 text-sm'>
            <p>City: {order.address.city}</p>
            <p>Payment: {order.orderStatus}</p>
          </div>

          {/* 📦 Address and Date */}
          <div className='flex justify-between gap-2 text-sm'>
            <p>Address: {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>

  )
}

export default Orders
