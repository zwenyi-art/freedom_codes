const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
  //for singbox security
  const userAgent = req.get("User-Agent");
  if (
    userAgent.includes("Chrome") ||
    userAgent.includes("Firefox") ||
    userAgent.includes("Safari") ||
    userAgent.includes("Thunder Client")
  ) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
   
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.user_id = decoded.UserInfo.user_id;
      req.roles = decoded.UserInfo.roles;
      next();
    });
  } else if (userAgent.includes("sing-box")) {
    const url_token = req.query.token;
    jwt.verify(url_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.user_id = decoded.UserInfo.user_id;
      req.roles = decoded.UserInfo.roles;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports = { verifyJWT };
