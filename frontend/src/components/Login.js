import React, { useState } from "react";
import "../App.css";
import axios from "axios";

const Login = ({setUser}) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function loginUser(credentials) {
    axios
      .post("http://localhost:8080/login", {
        body: JSON.stringify(credentials),
      })
      .then((response) => {
        console.log(response);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    //setToken();
  };

  return (
    <div className="Login login-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
