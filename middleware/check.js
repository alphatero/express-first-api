const check = function (req, res, next) {
  if (req.session.uid) {
    return next();
  }
  res.redirect("/users/signin");
};
