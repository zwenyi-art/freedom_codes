const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handleLogin = async (req, res) => {
  const { user_id, pwd } = req.body;
  if (!user_id || !pwd) {
    return res
      .status(400)
      .json({ message: "user id and password are required" });
  }
  const foundUser = await User.findOne({ user_id: user_id }).exec();
  if (!foundUser) return res.sendStatus(401);

  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    //create jwt
    //accessToken create
    const accessToken = jwt.sign(
      { UserInfo: { user_id: foundUser.user_id, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    //refresh token create
    const refreshToken = jwt.sign(
      {
        userInfo: {
          user_id: foundUser.user_id,
          roles: roles,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //saving refresh token to db
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    //create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken, roles });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
