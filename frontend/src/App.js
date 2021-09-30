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
  useLocation
} from "react-router-dom";
import Login from "./components/Login.js";
import Navbar from "./components/Navbar";
import ShoppingCart from "./components/shoppingcart";

function App() {

  return (
    <div className="App">
      <h1>Application</h1>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <h1>Shopping page</h1> } />
          <Route path="/login" component={Login}></Route>
          <Route path="/cart" component={ShoppingCart}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
