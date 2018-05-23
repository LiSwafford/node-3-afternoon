const users = require("../models/users");
let id = 1;

const login = (req, res, next) => {
  //   console.log(req);
  const { session } = req;

  if (
    req.body.username === session.user.username &&
    req.body.password === session.user.password
  ) {
    //update the value of username to the user's username
    session.user.username = req.body.username;
    res.status(200).json();
  } else {
    res.status(500).send("Unauthorized");
  }
};

const register = (req, res, next) => {
  const { username, password } = req.body;
  const { session } = req;
  users.push({ id, username, password });
  id++;
  session.user.username = username;
  res.status(200).json(session.user);
};

const signout = (req, res, next) => {
  //   console.log(req);
  const { session } = req;
  req.session.destroy();
  res.status(200).json(req.session);
};
const getUser = (req, res, next) => {
  //   const { session } = req;
  res.status(200).json(req.session.user);
};

module.exports = {
  login,
  register,
  signout,
  getUser
};
