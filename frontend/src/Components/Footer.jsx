import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='w-10/12 mx-auto mt-20 flex flex-col lg:flex-row gap-30'>
                <div className='w-full lg:1/2'>
                    <h3 className='text-3xl font-bold'>EliteAttire<span className='text-red-500 text-3xl rounded'>.</span></h3>
                    <p className='text-gray-500 mt-10 text-justify'>MERN Stack developer with experience building and deploying scalable web applications. Proficient in React, Node.js, MongoDB, and RESTful APIs. Strong foundation in frontend design with Tailwind CSS and Git version control. Eager to contribute to fast-paced development teams and grow professionally.</p>
                </div>
                <div className='flex flex-col md:flex-row justify-between gap-10'>
                    <div>
                        <h2 className='text-2xl'>COMPANY</h2>
                        <ul className='mt-2 text-gray-500 flex flex-col gap-2'>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-2xl'>GET IN TOUCH</h2>
                        <ul className='mt-8 text-gray-500 flex flex-col gap-2'>
                            <li>+91-9588307022</li>
                            <li>mern.rohitsharma@gmail.com</li>
                            <li>LinkedIn</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-10/12 mx-auto mt-10'>
                <hr />
                <p className='text-gray-500 text-center mt-5 mb-5'>Copyright 2025@ Rohit Sharma - All Right Reserved.</p>
            </div>
        </>
    )
}

export default Footer