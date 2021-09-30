import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </nav>
        </div>
    )
}

export default Navbar
