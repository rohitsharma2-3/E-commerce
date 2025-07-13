import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Admin = () => {

  const [formData, setformData] = useState({
    product: '',
    description: '',
    category: '',
    price: '',
    size: [],
  })

  const [image, setImage] = useState([])

  const inputHandler = (e) => {
    let { name, value, files } = e.target
    if (name === 'image') {
     setImage(prev => [...prev, ...files])
    } else {
      setformData({ ...formData, [name]: value })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    const data = new FormData();
  
    image.forEach(img => {
      if (img) data.append('image', img)
    })
    data.append('category', formData.category)
    data.append('price', formData.price)
    data.append('product', formData.product)
    data.append('description', formData.description)
    formData.size.forEach(size => data.append('size', size));

    axios.post('http://localhost:4000/ecommerce/create', data)
    console.log(data)
    toast.success("Successfully Added")
    setformData({
      product: '',
      description: '',
      category: '',
      price: '',
      size: [],
    })
    setImage([]);
  }

  const toggleSize = (s) =>
    setformData(p => (
      { ...p, size: p.size.includes(s) ? p.size.filter((x) => x !== s) : [...p.size, s] }
    ));

  return (
    <div className='w-6/7 md:w-5/7  px-20 py-4'>
      <div>
        <h1 className='text-2xl text-gray-700'>Add Items</h1>
        <form onSubmit={onSubmit} encType='multipart/form-data'>
          <div className='mt-5'>
            <label htmlFor="">Upload Image:</label>
            <input type="file" name='image' multiple onChange={inputHandler} className='border rounded mt-2 px-3 py-3 border-gray-500 w-full outline-none ' />
          </div>

          <div className='mt-5'>
            <label htmlFor="">Product name:</label>
            <input type="text" name='product' placeholder='Enter product name' value={formData.product} onChange={inputHandler} className='border mt-2 px-3 py-3 border-gray-500 w-full  outline-none rounded' />
          </div>

          <div className='mt-5'>
            <label htmlFor="">Product description:</label>
            <textarea type="text" name='description' value={formData.description} onChange={inputHandler} className='border mt-2 px-3 py-3 border-gray-500 w-full outline-none  rounded' placeholder='Write content here' rows={3} ></textarea>
          </div>

          <div className='flex mt-5 gap-3'>
            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="">Product category:</label>
              <select name='category' value={formData.category} onChange={inputHandler} className='border px-6 py-2 rounded'>
                <option value="" disabled>Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="">Product Price:</label>
              <input type='number' min={1} name='price' value={formData.price} onChange={inputHandler} placeholder='23' className='border px-6 py-2 rounded' />
            </div>
          </div>

          <div className='mt-5'>
            <label htmlFor="">Product Sizes:</label>
            <div className='flex gap-2 w-full mt-2'>
              {['S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (
                <button
                  type='button'
                  key={index}
                  onClick={() => toggleSize(size)}
                  className={`w-10 h-10 rounded ${formData.size.includes(size) ? 'text-white bg-black' : ' bg-gray-200'
                    }`}>
                  {size}
                </button>
              ))}
            </div>

          </div>
          <button className='px-10 py-3 mt-4 bg-black text-white'>ADD</button>
        </form>
      </div>
    </div>
  )
}

export default Admin