import React, { useState, useEffect, useContext } from 'react';
import Cart from '../assets/cart_icon.png';
import Profile from '../assets/profile_icon.png';
import Search from '../assets/search_icon.png';
import { Link } from 'react-router-dom';
import { CartContext } from './Context/Context';
import axios from 'axios';

const Navbar = () => {
  const { product } = useContext(CartContext);
  const lenght = product.length;
  const [open, setOpen] = useState(false);
  const [underLine, setUnderLine] = useState("home");
  const [onhover, setOnHover] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavClick = (li) => {
    setUnderLine(li);
    setOpen(false);
  };

  // 👇 Check token in cookies
  useEffect(() => {
    const hasToken = document.cookie.includes('token');
    setIsLoggedIn(hasToken);
  }, []);

  const logout = () => {
    axios.post('https://e-commerce-zjcb.onrender.com/ecommerce/logout', {}, {
      withCredentials: true,
    })
      .then(() => {
        setIsLoggedIn(false);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="relative z-30 ">
      <div className='flex justify-between items-center border-b w-11/12 mx-auto px-1 py-4 md:w-10/12'>
        <Link to={'/'}>
          <h4 className='text-3xl font-bold'>
            EliteAttire<span className='text-red-600 text-4xl'>.</span>
          </h4>
        </Link>

        {/* Desktop Nav */}
        <ul className='hidden gap-10 md:flex'>
          <li onClick={() => handleNavClick('home')} className={`${underLine === 'home' ? 'text-rose-300' : ''}`}> <Link to={'/'}>HOME</Link> </li>
          <li onClick={() => handleNavClick('collection')} className={`${underLine === 'collection' ? 'text-rose-300' : ''}`}> <Link to={'/collections'}>COLLECTION</Link> </li>
          <li onClick={() => handleNavClick('about')} className={`${underLine === 'about' ? 'text-rose-300' : ''}`}> <Link to={'/about'}>ABOUT</Link></li>
          <li onClick={() => handleNavClick('contact')} className={`${underLine === 'contact' ? 'text-rose-300' : ''}`}> <Link to={'/contact'}>CONTACT</Link> </li>
        </ul>

        {/* Icons */}
        <div className='flex gap-4 md:gap-7 md:text-2xl'>
          <button><Link to={'/collections'}><img src={Search} alt="search" className='w-5' /></Link></button>

          <button onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} className='relative'>
            <img src={Profile} alt="profile" className='w-5' />
            {onhover && (
              <div className="border absolute right-0 top-5 h-20 w-40 bg-white shadow-lg z-50">
                <ul className="text-sm text-center space-y-2 mt-4">
                  <li>
                    {isLoggedIn ?
                      <p onClick={logout} className="hover:text-gray-600 text-red-400">Logout</p>
                      :
                      <Link to="/login" className="hover:text-gray-600">Login</Link>
                    }
                  </li>
                  <li>
                    <Link to={'/order'} className="hover:text-gray-600">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
          </button>

          <button className='relative'>
            <Link to={'/cart'}>
              <img src={Cart} alt="cart" className='w-5' />
              {lenght > 0 && (
                <div className="absolute top-2 -right-2 bg-red-500 text-white text-xs rounded-full flex justify-center items-center w-5 h-5">
                  {lenght}
                </div>
              )}
            </Link>
          </button>

          <button className='md:hidden' onClick={() => setOpen(true)}>
            <i className="fa-solid fa-bars cursor-pointer"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 bottom-0 right-0 bg-rose-50 w-56 pt-20 px-5 z-40 transform transition-transform duration-500 ease-in-out md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className='absolute top-4 right-7 text-xl' onClick={() => setOpen(false)}>
          <i className="fa-solid fa-xmark cursor-pointer"></i>
        </button>
        <ul className='flex flex-col gap-10 text-lg'>
          <li onClick={() => handleNavClick('home')} className={`${underLine === 'home' ? 'text-rose-300' : ''}`}><Link to={'/'}>HOME</Link></li>
          <li onClick={() => handleNavClick('collection')} className={`${underLine === 'collection' ? 'text-rose-300' : ''}`}><Link to={'/collections'}>COLLECTION</Link></li>
          <li onClick={() => handleNavClick('about')} className={`${underLine === 'about' ? 'text-rose-300' : ''}`}><Link to={'/about'}>ABOUT</Link></li>
          <li onClick={() => handleNavClick('contact')} className={`${underLine === 'contact' ? 'text-rose-300' : ''}`}><Link to={'/contact'}>CONTACT</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
