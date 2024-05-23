import React, { useState } from 'react'
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
import axios from 'axios'

export default function Main() {
  const [cart, setCart] = useState([])

  const fetchCart = () => {
    axios
      .get(
        'http://localhost:8080/v1/store/cart/customer/' +
          localStorage.getItem('email'),
        {
          auth: {
            username: localStorage.getItem('email'),
            password: localStorage.getItem('password'),
          },
        }
      )
      .then((res) => {
        setCart(res.data)
      })
  }

  return (
    <div className="product-cart-container">
      <Products cart={cart} setCart={setCart} fetchCart={fetchCart} />
      <Cart cart={cart} setCart={setCart} fetchCart={fetchCart} />
    </div>
  )
}
