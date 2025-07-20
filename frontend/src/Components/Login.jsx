import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('login');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onFormHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = login === 'signup'
            ? 'https://e-commerce-zjcb.onrender.com/ecommerce/signup'
            : 'https://e-commerce-zjcb.onrender.com/ecommerce/login';

        try {
            const response = await axios.post(url, formData, {
                withCredentials: true
            });

            toast.success(`${login === 'signup' ? 'Signup' : 'Login'} Successfully`);
            navigate('/');
            setFormData({ name: '', email: '', password: '' });

        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className='10/12'>
            <div className='w-10/12 md:w-1/2 mx-auto md:p-2'>
                <h3 className='text-4xl text-center mt-10'>
                    <span className='text-gray-500'>{login === 'signup' ? 'Sign' : 'Login Yo'}</span>
                    <span className='text-gray-700'>{login === 'signup' ? ' Up' : 'ur Account'}</span>
                </h3>

                <form onSubmit={handleSubmit}>
                    {login === 'signup' && (
                        <div className='mt-5'>
                            <label htmlFor="name" className='block'>Name:</label>
                            <input
                                type="text"
                                placeholder='Enter your name'
                                name='name'
                                value={formData.name}
                                onChange={onFormHandler}
                                className='mt-3 w-full px-3 py-3 outline-none border border-gray-400'
                            />
                        </div>
                    )}
                    <div className='mt-5'>
                        <label htmlFor="email" className='block'>Email:</label>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            name='email'
                            value={formData.email}
                            onChange={onFormHandler}
                            className='mt-3 w-full px-3 py-3 outline-none border border-gray-400'
                        />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor="password" className='block'>Password:</label>
                        <input
                            type="password"
                            placeholder='Enter your password'
                            name='password'
                            value={formData.password}
                            onChange={onFormHandler}
                            className='mt-3 w-full px-3 py-3 outline-none border border-gray-400'
                        />
                    </div>

                    <div className='mt-5 mb-5'>
                        {login === 'login'
                            ? <p>Create new account? <span className='text-rose-500 font-bold cursor-pointer' onClick={() => setLogin('signup')}>SignUp</span></p>
                            : <p>Already have an account? <span className='text-rose-500 font-bold cursor-pointer' onClick={() => setLogin('login')}>Login</span></p>
                        }
                    </div>

                    <button
                        type="submit"
                        className='px-10 py-3 bg-rose-500 text-white font-bold rounded'
                    >
                        {login === 'login' ? 'Login' : 'SignUp'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
