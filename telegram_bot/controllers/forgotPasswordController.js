const User = require("../models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const uuId = () => uuidv4();
const generateRandomPassword = (length = 12) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
const forgotPwd = async (user_id) => {
  const pwd = generateRandomPassword();
  const token = uuId();
  const foundUser = await User.findOne({ user_id: user_id }).exec();
  if (!foundUser) return 0;
  try {
    //encrypt the password
    const hashPwd = await bcrypt.hash(pwd, 10);
    //create and store user info
    const result = await User.findOneAndUpdate(
      {
        user_id: user_id,
      },
      {
        password: hashPwd,
        token: token,
      }
    ).exec();
    console.log("successfully updated", result);
    const data = { userId: result.user_id, password: pwd };

    return data;
    // res.status(201).json({ success: `New user ${user_id} created` });
  } catch (error) {
    return error;
    // res.status(500).json({ message: error.message });
  }
};
module.exports = { forgotPwd };
