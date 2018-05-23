const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const { checkForUser } = require(`./middlewares/checkForSession`);
const { read } = require(`./controllers/swag_controller`);
const {
  login,
  register,
  signout,
  getUser
} = require(`./controllers/auth_controller`);

const { add, remove, checkout } = require(`./controllers/cart_controller`);

const { search } = require(`./controllers/search_controller`);

const app = express();

app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForUser);
app.use(express.static(`${__dirname}/build`));

app.get("/api/swag", read);

//Auth
app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/signout", signout);
app.get("/api/user", getUser);

// cart
app.post("/api/cart", add);
app.post("/api/cart/checkout", checkout);
app.delete("/api/cart", remove);

app.get("/api/search", search);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
