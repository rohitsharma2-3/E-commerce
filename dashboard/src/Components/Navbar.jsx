import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <div className='py-3 px-3 md:px-15 border-b'>
            <div className='w-11/12 flex justify-between items-center mx-auto'>
                <div>
                   <Link to={'/'}><h1 className='text-3xl font-bold'>FOREVER<span className='text-red-500 rounded'>.</span></h1></Link> 
                    <h1 className='text-rose-400'>ADMIN PANEL</h1>
                </div>
                <button className='hidden px-10 py-2 bg-black text-white font-md'>login</button>
            </div>
        </div>
    )
}

export default Navbar