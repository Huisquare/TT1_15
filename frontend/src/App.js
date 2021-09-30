import React, { useContext, createContext, useState } from "react";
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

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login}></Route>
          <Route path="/cart" component={ShoppingCart}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
