import { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Signin from './pages/Signin/Signin'
import Login from './pages/Login/Login'
import Welcome from './pages/Home/Home'
import Main from './pages/Main/Main'
import Order from './pages/Order/Order'

function App() {
  useEffect(() => {
    axios.get('http://localhost:8080/v1/store/role').then((res) => {
      console.log(res.data)
    })
  }, [])

  return (
    <>
      <div className="box-container">
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/login">Login</Link>
        <Link to="/products">Products</Link>
      </div>

      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signin">
          <Signin />
        </Route>

        <Route path="/products">
          <Main />
        </Route>

        <Route path="/order">
          <Order />
        </Route>
      </Switch>
    </>
  )
}

export default App
