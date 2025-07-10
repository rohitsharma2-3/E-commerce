import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [hover, setHover] = useState('')
    return (
        <div className='pt-10 h-[89vh] border-x flex flex-col gap-10 '>
            <Link to='/additem' onClick={() => setHover('add')}>
                <div className={`flex items-center gap-5 border-y border-l p-3 ml-10 border-gray-400 ${hover === 'add' ? 'bg-rose-100' : ''}`}>
                    <p className=' h-8 w-8 border border-gray-500 flex justify-center items-center rounded-full'>+</p>
                    <h1>Add Item</h1>
                </div>
            </Link>
            <Link to={'/listitem'} onClick={() => setHover('list')}>
                <div className={`flex items-center gap-5 border-y border-l p-3 ml-10 border-gray-400 ${hover === 'list' ? 'bg-rose-100' : ''}`}>
                    <p className=' h-8 w-8 border border-gray-500 flex justify-center items-center '>✓</p>
                    <h1>List Item</h1>
                </div>
            </Link>
            <Link to={'/orders'} onClick={() => setHover('order')}>
                <div className={`flex items-center gap-5 border-y border-l p-3 ml-10 border-gray-400 ${hover === 'order' ? 'bg-rose-100' : ''}`}>
                    <p className=' h-8 w-8 border border-gray-500 flex justify-center items-center'>✓</p>
                    <h1>Orders</h1>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar