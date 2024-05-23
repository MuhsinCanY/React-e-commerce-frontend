import { useEffect, useState } from 'react'
import './Cart.css'
import '../Products/Product.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Cart({ cart, setCart, fetchCart }) {
  const history = useHistory()

  useEffect(() => {
    fetchCart()
  }, [])

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8080/v1/store/cart/delete/' + id, {
        auth: {
          username: localStorage.getItem('email'),
          password: localStorage.getItem('password'),
        },
      })
      .then((res) => {
        fetchCart()
      })
  }

  return (
    <div>
      <h1>Cart</h1>
      <div className="product-container">
        {cart.length === 0 ? <h2>Your cart is empty!</h2> : <p></p>}
        {cart.map((item) => (
          <div className="product" key={item.id}>
            <h2>{item.product.name}</h2>
            <h2>x{item.count}</h2>
            <h4>{item.product.price} $</h4>
            <h4>
              -{'>'} {item.product.price * item.count} $
            </h4>
            <button
              className="remove-button"
              onClick={() => handleDelete(item.id)}
            >
              X
            </button>
          </div>
        ))}
        <h2>
          Total: {cart.reduce((a, b) => a + b.product.price * b.count, 0)} $
        </h2>
        <button
          className="complete-button"
          onClick={() => history.push('/order')}
        >
          Complete Order
        </button>
      </div>
    </div>
  )
}
