const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const uuId = () => uuidv4();
const bcrypt = require("bcrypt");
const handleRegister = async (req, res) => {
  const { user_id, pwd } = req.body;
  console.log(user_id);
  if (!user_id || !pwd) {
    return res
      .status(400)
      .json({ message: "user id and password are required" });
  }
  //finding duplicate
  const duplicate = await User.findOne({ user_id: user_id }).exec();
  if (duplicate) return res.sentStatus(409);
  //generate token
  const token = uuId();
  try {
    //encrypt the password
    const hashPwd = await bcrypt.hash(pwd, 10);

    //create and store user info
    const result = await User.create({
      user_id: user_id,
      password: hashPwd,
      token: token,
      coins: 0,
      requestTime: 0,
    });
    console.log("successfully created", result);
    res.status(201).json({ success: `New user ${user_id} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { handleRegister };
