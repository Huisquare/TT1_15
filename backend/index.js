const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({
  origin: '*'
}));
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

/*Saving Session*/
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(
  session({
    secret: "dbs",
    resave: true,
    saveUninitialized: true,
  })
);

/*Save Session User ID*/
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/*Delete Session User ID*/
passport.deserializeUser((id, done) => {
  customers.findById(id, (err, user) => {
    done(err, user);
  });
});

/*Passport Authentication*/
passport.use(
  new LocalStrategy(function (username, password, done) {
    db.customers.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

/* MongoDB connection */
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://username1:username1password@cluster0.5sq7h.mongodb.net/dbs?retryWrites=true&w=majority";
/* const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const db = client.db("dbs");
  console.log(db)
  // perform actions on the collection object
  client.close();
}); */
const PORT = 5000;
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connection is established and running on port: ${PORT}`)
    )
  )
  .catch((err) => console.log(err.message));

/* Login Function */
app.post("/login", (req, res) => {
  var user = req.body.username;
  var pass = req.body.password;
  db.customers.findOne({username: user}, (err, userFound) => {
    if (err) return console.log(err);
    if (userFound) {
      if (pass === userFound.password) {
        res.send({token: 'random'})
      }
    }
  })
})

/* Logout Function */
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

/* Create User */
app.post("create", (req, res) => {
  var newuser = req.body.username;
  db.customers.findOne({ username: newuser }, (err, userFound) => {
    if (err) return console.log(err);
    if (userFound) {
      res.send(`Username ${newuser} taken`);
    } else {
      const data = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        postal_code: req.body.postal_code,
        gender: req.body.gender,
        created_at: new Date().toISOString().split("T")[0],
      };
      db.customers.push((err, data) => {
        if (err) return console.log(err);
        res.json({ username });
      });
    }
  });
});

/* const listener = app.listen(process.env.PORT || 4000, () => {
  console.log("Your app is listening on port " + listener.address().port);
}); */




/*View Shopping Cart*/

app.get('cart/view', (req, res) => {
  res.send(req.body)
})

/*Update Shopping Cart*/

app.get('cart/update', (req, res) => {

})

/*Add Shopping Cart*/

app.post('cart/add', (req, res) => {
  res.send(req.body)
})

/*Delete Shopping Cart*/
app.get('cart/delete', (req, res) => {
  var cart  = req.body.filter(item => {
    return item !== req.body;
  })
  res.send(cart)
})

/* Updating Database upon Checkout */
app.post('/checkout', (req, res) => {
  var prodID = req.body.id
  var prodCount = req.body.count

  var quantity = (prodID, done) => {
    db.products.findByID({id: prodID}, (err, found) => {
      if (err) return console.log(err);
      done(null, found.qty)
    })
  }

  quantity -= prodCount

  db.product.findOneAndUpdate(
    {id: prodID}, {qty: quantity}, {new: true}, (err, updated) => {
      if (err) return console.log(err);
      done(null, updated);
    })
}) 


/* View Products */
app.get("/view/products", (req, res) => {
  console.log("product");
  db.products.find({}).then((prod) => {
    res.send(prod);
  });
});

/* View Categories */
app.get("/view/categories", (req, res) => {
  db.categories.find({}).then((cat) => {
    res.send(cat);
  });
});

const data = require("./categories.json");

/*return categories*/
app.get("/categories", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

const productData = require("./products.json");

/*return products*/
app.get("/products", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(productData));
});


/*get product id*/
app.get("/productID", (req, res) => {
  db.products.findById(req.id, (err, product) => {
    if (err) return console.log(err);
    done(null, product);
  })
})