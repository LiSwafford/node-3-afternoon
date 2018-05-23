const swag = require("../models/swag");

const read = (req, res, next) => {
  //   console.log(req);
  res.status(200).json(swag);
};

module.exports = {
  read
};
