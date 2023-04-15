const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Coupon Code Name!"],
      unique: true,
    },
    discount: {
      type: Number,
      required: [true, "Please enter Discount Price!"],
    },
    minAmount: {
      type: Number,
    },
    maxAmount: {
      type: Number,
    },
    shopId: {
      type: String,
      required: true,
    },
    selectedProduct: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CouponCode", couponCodeSchema);
