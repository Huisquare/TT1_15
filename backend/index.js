const express = require("express");
const app = express();
const cors = require('cors')
require('dotenv').config();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

/*Saving Session*/
app.use(express.static("public"));
app.use(session({ secret: "dbs" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

/*Save Session User ID*/
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/*Delete Session User ID*/
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/*Passport Authentication*/
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.customers.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

/* MongoDB connection */
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://username1:<password>@cluster0.5sq7h.mongodb.net/dbs?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const db = client.db("dbs");
  // perform actions on the collection object
  client.close();
});

/* Login Function */
app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
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
      res.send(`Username ${newuser} taken`)
    } else {
      const data = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        postal_code: req.body.postal_code,
        gender: req.body.gender,
        created_at: new Date().toISOString().split('T')[0]
      }
      dbs.customers.save((err, data) => {
        if (err) return console.log(err);
        res.json({username})
      })
    }
  })
})


mongoose.Promise = global.Promise;
app.use(express.json());

// app.get("/api", (req, res) => res.send("Its working!"));

// app.listen(process.env.port || 4000, function () {
//     console.log("now listening for requests");
// });

// initialize routes
app.use("/api", require("./routes/api"));

// error handling middleware
app.use(function (err, req, res, next) {
    //console.log(err);
    res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.port || 4000, function () {
    console.log("Ready to Go!");
});