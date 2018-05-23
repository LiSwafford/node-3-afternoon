const checkForUser = (req, res, next) => {
  // need more explaination of req, res here
  const { session } = req;
  if (!session.user) {
    session.user = { username: "", cart: [], total: 0 };
  }
  next();
};

module.exports = {
  checkForUser
};
