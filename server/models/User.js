const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  user_name: {
    type: String,
    require: true,
  },
  user_id: {
    type: Number,
    require: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: Number,
  },
  password: {
    type: String,
    require: true,
  },
  refreshToken: String,
  token: String,
  coins: { type: Number },
  coupon: String,
  requestTime: { type: Number },
});
module.exports = mongoose.model("User", userSchema);
