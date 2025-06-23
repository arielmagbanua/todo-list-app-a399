const redirectIfNotAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    // no authenticated user, redirect to login
    return res.redirect("/auth/login");
  }
  next();
};

export default redirectIfNotAuthenticated;
