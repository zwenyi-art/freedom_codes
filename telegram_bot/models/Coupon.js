const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CouponSchema = new Schema({
  coupon: String,
  type: String,
});
module.exports = mongoose.model("Coupon", CouponSchema);
