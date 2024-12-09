const { userInfo } = require("os");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log(
      `err ${err} , decoded ${decoded} , foundUser ${foundUser.user_id}`
    );
    if (err || foundUser.user_id !== decoded.userInfo.user_id) {
      return res.sendStatus(403);
    }
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { user_id: foundUser.user_id, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    res.status(200).json({ roles: roles, accessToken: accessToken });
  });
};
module.exports = { handleRefreshToken };
