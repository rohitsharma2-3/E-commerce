import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState('login')
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onFormHandler = (e) => {
        let { name, value } = e.target
        setformData({ ...formData, [name]: value })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        setformData({
            name: '',
            email: '',
            password: ''
        })
    }

    const signUp = () => {
        axios.post('http://localhost:4000/ecommerce/signup', formData, {
            withCredentials: true
        })
            .then((res) => {
                toast.success('SignUP Successfully');
                navigate('/');
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            })
    }

    const loginRoute = () => {
        axios.post('http://localhost:4000/ecommerce/login', formData, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data)
                toast.success('Login Successfully');
                navigate('/');
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            })
    }

    return (
        <div className='10/12'>
            <div className='w-10/12 md:w-1/2 mx-auto md:p-2'>
                {login === 'signup' ? <h3 className='text-4xl text-center mt-10'>
                    <span className='text-gray-500'>Sign</span>
                    <span className='text-gray-700'> Up</span>
                </h3> : <h3 className='text-4xl text-center mt-10'>
                    <span className='text-gray-500'>Login Yo</span>
                    <span className='text-gray-700'>ur Account</span>
                </h3>}
                <form onSubmit={onSubmit}>
                    {login === 'signup' ? <div className='mt-5'>
                        <label htmlFor="name" className='block'>Name:</label>
                        <input type="text" placeholder='Enter your name' name='name' value={formData.name} onChange={onFormHandler} id='name' className='mt-3 w-full px-3 py-3 outline-none border border-gray-400' />
                    </div> : null}
                    <div className='mt-5'>
                        <label htmlFor="email" className='block'>Email:</label>
                        <input type="email" placeholder='Enter your email' name='email' value={formData.email} onChange={onFormHandler} id='email' className='mt-3 w-full px-3 py-3 outline-none border border-gray-400' />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor="password" className='block'>Password:</label>
                        <input type="password" placeholder='Enter your password' name='password' value={formData.password} onChange={onFormHandler} id='password' className='mt-3 w-full px-3 py-3 outline-none border border-gray-400' />
                    </div>
                    <div className='mt-5 mb-5'>
                        {login === 'login' ? <p>Create new account? <span className='text-rose-500 font-bold cursor-pointer' onClick={() => setLogin('signup')}>SignUp</span></p> : null}
                        {login === 'signup' ? <p>Have already a account? <span className='text-rose-500 font-bold cursor-pointer' onClick={() => setLogin('login')}>Login</span></p> : null}
                    </div>
                    {login === 'login' ?
                        <button className='px-10 py-3 bg-rose-500 text-white font-bold rounded' onClick={loginRoute} > Login</button>
                        : <button className='px-10 py-3 bg-rose-500 text-white font-bold rounded' onClick={signUp}> SignUp</button>}

                </form>
            </div>
        </div>
    )
}

export default Login