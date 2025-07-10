import React from 'react'
import Rohit from '../assets/Me.jpg'

const About = () => {
    return (
        <div>
            <div className='w-10/12 mx-auto'>
                <h2 className='text-4xl text-center mt-10'>
                    <span className='text-gray-500'>About</span>
                    <span className='text-gray-800'> Me</span>
                </h2>
                <div className='mt-10 flex flex-col md:flex-row items-center gap-10 '>
                    <div className='w-2/2 md:w-1/2'>
                        <img src={Rohit} alt="" className='w-full md:w-auto md:h-[600px] rounded' /></div>
                    <div className='w-2/2 md:w-1/2 text-gray-500 leading-loose'><p>Hi, I'm Rohit — a passionate MERN Stack Developer with a strong focus on building full-stack web applications that are scalable, responsive, and user-friendly.</p>

                        <div className='leading-loose mt-10'>
                            <p>I specialize in:</p>

                            <p>MongoDB for flexible and efficient data storage,</p>

                            <p>Express.js for backend logic and RESTful APIs,</p>

                            <p>React.js for creating dynamic user interfaces, and</p>

                            <p>Node.js for server-side development and application logic.</p>

                        </div>
                        <p className='mt-10'>With a solid foundation in both frontend and backend technologies, I take pride in delivering end-to-end solutions — from crafting intuitive UIs to implementing robust backend services with authentication, CRUD operations, and secure API integration.</p>

                        <p className='mt-4'>Whether it's an e-commerce store, a booking platform, or a custom dashboard, I'm committed to writing clean code, solving real-world problems, and continuously improving my skills.</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default About