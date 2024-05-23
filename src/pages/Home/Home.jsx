import React, { useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Welcome() {
  useEffect(() => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
  }, [])

  return (
    <div>
      <h1>Welcome E-Commerce</h1>
      <div className="box-container">
        <Link className="box" to="/signin">
          Sign In
        </Link>
        <Link className="box" to="/login">
          Login
        </Link>
      </div>
    </div>
  )
}
