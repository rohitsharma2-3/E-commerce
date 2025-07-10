import React from 'react'
import contact from '../assets/contact_img.png'
const Contact = () => {
    return (
        <div className='w-10/12 mx-auto'>
            <h3 className='mt-4 text-4xl text-center'>
                <span className='text-gray-500 '>Contact</span>
                <span className='text-gray-700 '> ME</span>
            </h3>
            <div className='flex flex-col md:flex-row gap-10 mt-10'>
                <div>
                    <img src={contact} alt="image" className='w-full md:h-[600px]' />
                </div>
                <form action="" className='w-2/2 md:w-1/2'>
                    <div className='mt-5'>
                        <label htmlFor="name">Name:</label>
                        <input type="Enter your name" className='border border-gray-500 px-4 py-3 w-full rounded mt-3' />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor="name">Email:</label>
                        <input type="Enter your eamil" className='border border-gray-500 px-4 py-3 w-full rounded mt-3' />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor="name">Query:</label>
                        <textarea type="Enter your Query" className='border border-gray-500 px-4 py-3 w-full rounded mt-3' rows={8}></textarea>
                    </div>
                    <button className='mt-3 px-5 py-3 bg-rose-400 text-white rounded-2xl'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact