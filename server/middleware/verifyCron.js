const verifyCron = (req, res, next) => {
  const token = req.headers["x-api-key"];
  // Check if the token exists
  if (!token) {
    return res
      .status(403)
      .send({ message: "Access Denied: No Token Provided" });
  }

  // Validate the token (ensure this matches your server-side secret)
  if (token !== process.env.CRON_TOKEN_SECRET) {
    return res.status(403).send({ message: "Access Denied: Invalid Token" });
  }

  // Token is valid, proceed to the next middleware or route handler
  next();
};
module.exports = { verifyCron };
