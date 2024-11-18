const { couponGen } = require("../generator/couponCodeGen");
const Coupon = require("../models/Coupon");
const createCoupon = async (req, res) => {
  const coupon = couponGen();
  const result = await Coupon.create({ coupon: coupon, type: "every_20" });
  res.status(200).send({ data: result });
};
const updateCoupon = async (req, res) => {
  const coupon = couponGen();
  const result = await Coupon.findOneAndUpdate(
    { type: "every_20" },
    { coupon: coupon },
    {
      new: true,
      runValidators: true,
    }
  );
  return result.coupon;
  // res.status(200).send({ updated_data: result });
};

const getCoupon = async (req, res) => {
  const result = await Coupon.findOne({ type: "every_20" });
  return result.coupon;
};
module.exports = { createCoupon, updateCoupon, getCoupon };
