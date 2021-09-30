import React, { useContext, createContext, useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login.js";
import NavBar from "./components/Navbar";
import ShoppingCart from "./components/shoppingcart";
import Home from "./components/home";
import useToken from "./components/useToken";
import axios from "axios";

function App() {
  const { token, setToken } = useToken();
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = () => {
      axios.get("http://localhost:5000/products").then((res) => {
        setProducts(res.data);
      }, []);
    };

    fetchProducts();
  }, []);
  console.log(products);

  if (user == null) {
    return <Login setUser={setUser} />;
  }

  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProducts = () => {
      axios.get("http://localhost:5000/products").then((res) => {
        setProducts(res.data);
      }, []);
    };

    fetchProducts();
  }, []);
  console.log(products);

  /* if (!token) {
    return <Login setToken={setToken} />;
  } */

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home products={products} />
          </Route>
          <Route path="/cart" component={ShoppingCart}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
