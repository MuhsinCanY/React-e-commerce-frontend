import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Login() {
  const history = useHistory()

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

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
      .get('http://localhost:8080/v1/store/role', {
        auth: {
          username: values.email,
          password: values.password,
        },
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          localStorage.setItem('email', values.email)
          localStorage.setItem('password', values.password)
          history.push('/products')
          console.log('Login successful')
        }
      })
  }

  return (
    <div>
      <h1>Login</h1>
      <form className="register-form" onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </div>
  )
}
