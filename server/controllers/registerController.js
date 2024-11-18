const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const uuId = () => uuidv4();
const bcrypt = require("bcrypt");
const generateRandomPassword = () => {
  return uuidv4().slice(0, 8); // Generate an 8-character random password
};
const handleRegister = async (user_id) => {
  const pwd = generateRandomPassword();
  if (!user_id || !pwd) {
    return "user id and password are requierd";
  }
  // const { user_id, pwd } = req.body;
  // console.log(user_id);
  // if (!user_id || !pwd) {
  //   return res
  //     .status(400)
  //     .json({ message: "user id and password are required" });
  // }
  //finding duplicate
  const duplicate = await User.findOne({ user_id: user_id }).exec();
  // if (duplicate) return res.sentStatus(409);
  if (duplicate) return "you already registered";
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
    const data = `UserId : ${result.user_id}\nPassword : ${pwd}`;
    return data;
    // res.status(201).json({ success: `New user ${user_id} created` });
  } catch (error) {
    return error;
    // res.status(500).json({ message: error.message });
  }
};
module.exports = { handleRegister };
