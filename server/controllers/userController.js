const User = require("../models/User");
const Coupon = require("../models/Coupon");
const { v4: uuidv4 } = require("uuid");
const uuId = () => uuidv4();

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ data: users });
};

const getUser = async (req, res) => {
  const users = await User.findOne({ user_id: req.user_id });
  res
    .status(200)
    .json({ coins: users.coins, user_id: users.user_id, token: users.token });
};
const deleteUser = async (req, res) => {
  return;
};

const addCoins = async (req, res) => {
  const { coupon } = req.body;
  if (!req.user_id & !coupon) {
    return res.sendStatus(400);
  }
  const foundUser = await User.findOne({ user_id: req.user_id }).exec();
  const foundCoupon = await Coupon.findOne({ coupon: coupon }).exec();
  if (!foundUser) return res.sendStatus(401);
  if (!foundCoupon) return res.status(401).send("expired token");
  if (foundUser.coupon === foundCoupon.coupon) {
    return res.status(400).send("you used this coupon");
  }
  foundUser.coins += 100;
  foundUser.coupon = coupon;
  const result = await foundUser.save();
  res
    .status(200)
    .json({ message: "Coins added successfully", data: result.coins });
};

const useCoins = async (req, res) => {
  const { user_id, coins } = req.body;
  const token = uuId();
  const foundUser = await User.findOne({ user_id: user_id }).exec();
  if (!foundUser) return res.sendStatus(401);
  if (foundUser.coins < coins)
    return res.status(402).send({ data: "insufficient coins" });
  const newCoins = foundUser.coins - coins;
  foundUser.token = token;
  foundUser.coins = newCoins;
  const result = await foundUser.save();
  const newUrl = `http://192.168.1.102:3500/api/v1/${result.user_id}?token=${result.token}`;
  res.status(200).json({ url: newUrl });
};
module.exports = { getAllUsers, getUser, addCoins, useCoins };
