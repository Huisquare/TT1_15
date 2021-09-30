const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const cors = require('cors')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

let categories = JSON.parse(require('categories.json'))
let customers = JSON.parse(require('customers.json'))
let products = JSON.parse(require('products.json'))

app.use(
    session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: false,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());


/* Login Function */
app.post("/login", passport.authenticate("local", {failureRedirect: "/login"}),
    (req, res) => {
      res.render("profile", { user: req.user});
    }
  );

/* Logout Function */
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });

