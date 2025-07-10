import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import LatestCollections from './Components/LatestCollections';
import BestSeller from './Components/BestSeller';
import ExChange from './Components/ExChange';
import Footer from './Components/Footer';
import About from './Components/About';
import Contact from './Components/Contact';
import ProductDetail from './Components/ProductDetail';
import Collection from './Components/Collection';
import Login from './Components/Login';
import Cart from './Components/Context/Cart';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CheckOut from './Components/CheckOut';
import Order from './Components/Order';

const Home = () => (
  <>
    <Hero />
    <LatestCollections />
    <BestSeller />
    <ExChange />
  </>
);

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} className='p-5 ' />
      <Footer />
    </>
  );
};

export default App;
