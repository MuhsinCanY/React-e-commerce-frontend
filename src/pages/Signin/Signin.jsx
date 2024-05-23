import { useState } from 'react'
import './Signin.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Signin() {
  const history = useHistory()

  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const handleFullNameInputChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      fullName: event.target.value,
    }))
  }

  const handleEmailInputChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      email: event.target.value,
    }))
  }

  const handlePasswordInputChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      password: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post('http://localhost:8080/v1/store/customer/register', values)
      .then((res) => {
        console.log(res)
        if (res.status >= 200 && res.status < 300) {
          localStorage.setItem('email', values.email)
          localStorage.setItem('password', values.password)
          history.push('/products')
          console.log('Sign In successful')
        }
      })
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="form-field"
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleFullNameInputChange}
        />

        <input
          className="form-field"
          type="text"
          placeholder="E-mail"
          name="email"
          value={values.email}
          onChange={handleEmailInputChange}
        />

        <input
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handlePasswordInputChange}
        />

        <button className="form-button" type="submit" onClick={handleSubmit}>
          Sign In
        </button>
      </form>
    </div>
  )
}
