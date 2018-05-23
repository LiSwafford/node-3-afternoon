const swag = require("../models/swag");

const search = (req, res, next) => {
  const { category } = req.query;
  if (!category) {
    res.status(200).json(swag);
  } else {
    const filteredItem = swag.filter(item => item.category === category);
    res.status(200).json(filteredItem);
  }
};

module.exports = {
  search
};
