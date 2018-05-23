const swag = require("../models/swag");

const add = (req, res, next) => {
  const { id } = req.query;
  console.log(`query`, req.query);
  const { cart } = req.session.user;
  const index = cart.findIndex(item => item.id == id);
  console.log(`index`, index);
  if (index === -1) {
    // console.log(swag);
    const selectedItem = swag.find(item => item.id == id);
    cart.push(selectedItem);
    console.log(cart);
    req.session.user.total += selectedItem.price;
    console.log(selectedItem);
  }
  res.status(200).send(req.session.user);
};

const remove = (req, res, next) => {
  const { id } = req.query;
  const { cart } = req.session.user;
  const selectedItem = swag.find(item => item.id == id);
  if (selectedItem) {
    const i = cart.findIndex(item => item.id == id);
    cart.splice(i, 1), (req.session.user.total -= selectedItem.price);
  }
  res.status(200).send(req.session.user);
};
const checkout = (req, res, next) => {
  const { user } = req.session;
  user.cart = [];
  user.total = 0;
  res.status(200).json(req.session.user);
};

module.exports = {
  add,
  remove,
  checkout
};
