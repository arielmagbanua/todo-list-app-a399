const failIfUnauthorized = (req, res, next) => {
  if (!req.session.user) {
    // no authenticated user, fail with 401 Unauthorized
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

export default failIfUnauthorized;
