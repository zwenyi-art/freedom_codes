const User = require("../models/User");
const verifyCoin = async (req, res, next) => {
  const { id } = req.params;
  const { token } = req.query;
  if (token) {
    const foundUser = await User.findOne({
      user_id: id,
      token: token,
    }).exec();
    if (!foundUser) return res.sendStatus(403);
    if (foundUser.coins <= 0)
      return res.status(502).send({ data: "insufficient coins" });
    foundUser.coins -= 100;
    foundUser.requestTime = foundUser.requestTime + 1;
    await foundUser.save();
    next();
  } else {
    res.status(404).send({ data: "need id and token" });
  }
};
module.exports = { verifyCoin };
