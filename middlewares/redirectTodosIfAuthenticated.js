const redirectTodosIfAuthenticated = (req, res, next) => {
  if (req.session.user) {
    // user is authenticated, redirect to todos
    return res.redirect("/todos");
  }

  next();
};

export default redirectTodosIfAuthenticated;
