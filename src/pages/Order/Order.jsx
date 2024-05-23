import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Order() {
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

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <div>
      <h1>Order Created Succesfully</h1>
      <div className="product-container">
        {cart.map((item) => (
          <div className="product" key={item.id}>
            <h2>{item.product.name}</h2>
            <h2>x{item.count}</h2>
            <h4>{item.product.price} $</h4>
            <h4>
              -{'>'} {item.product.price * item.count} $
            </h4>
          </div>
        ))}
        <h2>
          Total: {cart.reduce((a, b) => a + b.product.price * b.count, 0)} $
        </h2>
      </div>
    </div>
  )
}
