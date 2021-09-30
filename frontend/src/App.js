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
  const [user, setUser] = useState(null)

  if (user == null) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={ShoppingCart}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
