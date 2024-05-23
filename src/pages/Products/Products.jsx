import axios from 'axios'
import { useEffect, useState } from 'react'
import './Product.css'

export default function Products({ setCart, cart, fetchCart }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/v1/store/product').then((res) => {
      setProducts(res.data)
    })
  }, [])

  const handleAddToCart = (event, index) => {
    let isContain = false
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === index) {
        console.log(products[i])
        console.log(cart)

        for (let j = 0; j < cart.length; j++) {
          if (cart[j].product.id == index) {
            console.log(cart[j])

            //put request here

            axios
              .put(
                'http://localhost:8080/v1/store/cart/update/' + cart[j].id,
                {
                  count: cart[j].count + 1,
                  productId: index,
                  customerName: localStorage.getItem('email'),
                },
                {
                  auth: {
                    username: localStorage.getItem('email'),
                    password: localStorage.getItem('password'),
                  },
                }
              )
              .then((res) => {
                fetchCart()
              })
              .catch((error) => {
                console.error('There was an error saving the cart!', error)
              })
            isContain = true
            return
          }
        }

        if (isContain == false) {
          axios
            .post(
              'http://localhost:8080/v1/store/cart/save',
              {
                count: 1,
                productId: index,
                customerName: localStorage.getItem('email'),
              },
              {
                auth: {
                  username: localStorage.getItem('email'),
                  password: localStorage.getItem('password'),
                },
              }
            )
            .then((res) => {
              fetchCart()
            })
            .catch((error) => {
              console.error('There was an error saving the cart!', error)
            })
        }
      }
    }
  }

  return (
    <div>
      <h1>Products</h1>
      <div className="product-container">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <h2>{product.name}</h2>
            <h4>{product.price} $</h4>
            <button
              className="store-button"
              onClick={(event) => handleAddToCart(event, product.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
