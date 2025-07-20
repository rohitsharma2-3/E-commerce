import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
export const CartContext = createContext(null)

export const Context = (props) => {
    const [payment, setPayment] = useState('COD')
    const [product, setProduct] = useState(() => {
        const SavedItem = localStorage.getItem('product')
        return SavedItem ? JSON.parse(SavedItem) : []
    })
    console.log(product)

    useEffect(() => {
        localStorage.setItem('product', JSON.stringify(product))
    }, [product])
    return (
        <CartContext.Provider value={{ product, setProduct, payment, setPayment }}>
            {props.children}
        </CartContext.Provider>
    )
}
