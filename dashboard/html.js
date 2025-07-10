import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({
    product: '',
    description: '',
    category: '',
    price: '',
    size: [],
  });

  const [images, setImages] = useState([null]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const addImageInput = () => {
    setImages(prev => [...prev, null]);
  };

  const removeImageInput = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size) => {
    setFormData(prev => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter(s => s !== size)
        : [...prev.size, size],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    images.forEach(img => {
      if (img) data.append('image', img);
    });

    data.append('product', formData.product);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('price', formData.price);
    formData.size.forEach(size => data.append('size', size));

    axios.post('http://localhost:4000/ecommerce/create', data)
      .then(() => {
        setFormData({
          product: '',
          description: '',
          category: '',
          price: '',
          size: [],
        });
        setImages([null]);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="w-6/7 md:w-5/7 px-20 py-4">
      <h1 className="text-2xl text-gray-700 mb-4">Add Items</h1>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        
        {/* Image Uploads */}
        <label>Upload Images:</label>
        {images.map((img, index) => (
          <div key={index} className="flex items-center gap-3 my-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
              className="border px-3 py-2 rounded w-full"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeImageInput(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addImageInput}
          className="mb-4 text-blue-500 underline text-sm"
        >
          + Add another image
        </button>

        {/* Product Name */}
        <div className="mb-4">
          <label>Product name:</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={inputHandler}
            placeholder="Enter product name"
            className="border mt-1 px-3 py-2 border-gray-500 w-full outline-none rounded"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label>Product description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={inputHandler}
            placeholder="Write content here"
            rows={3}
            className="border mt-1 px-3 py-2 border-gray-500 w-full outline-none rounded"
          ></textarea>
        </div>

        {/* Category & Price */}
        <div className="flex gap-4 mb-4">
          <div className="w-full">
            <label>Product category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={inputHandler}
              className="border mt-1 px-3 py-2 rounded w-full"
            >
              <option value="" disabled>Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="w-full">
            <label>Product price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={inputHandler}
              min={1}
              placeholder="Enter price"
              className="border mt-1 px-3 py-2 rounded w-full"
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <label>Product Sizes:</label>
          <div className="flex gap-2 mt-2">
            {['S', 'M', 'L', 'XL', 'XXL'].map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleSize(s)}
                className={`w-10 h-10 rounded ${formData.size.includes(s)
                  ? 'bg-black text-white'
                  : 'bg-gray-200'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-10 py-3 bg-black text-white rounded"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Admin;
