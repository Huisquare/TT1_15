const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const cors = require('cors')
require('dotenv').config();




/* MongoDB connection */
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://username1:<password>@cluster0.5sq7h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const db = client.db("dbs");
  // perform actions on the collection object
  client.close();
});

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))



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

/* Create User */
app.post("create", (req, res) => {
  var newuser = req.body.username
  dbs.customers.findOne({username: newuser}, (err, userFound) => {
    if (err) return console.log(err);
    if (userFound) {
      res.send('Username taken')
    } else {
      const data = {
        username: req.body.username,

      }
      dbs.customers.save((err, data) => {
        if (err) return console.log(err);
        res.json({username})
      })
    }
  })
})