const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSellerAuthenticated } = require("../middleware/auth");
const Shop = require("../model/shop.js");
const CouponCode = require("../model/couponCode.js");

router.post(
  "/create-coupon-code",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponCodeExists = await CouponCode.findOne({
        name: req.body.name,
      });

      if (isCouponCodeExists) {
        return next(new ErrorHandler("Coupon Code Already Exists!", 400));
      }
      const couponCode = await CouponCode.create(req.body);
      res.status(201).json({
        success: true,
        message: "Coupon Code created Successfully!",
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all Coupons of a Shop
router.get(
  "/getcoupons/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Delete an Event Product of Shop
router.delete(
  "/delete-coupon/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupon = await CouponCode.findByIdAndDelete(req.params.id);

      if (!coupon) return next(new ErrorHandler("Coupon Not Found!", 500));

      res.status(200).json({
        success: true,
        message: "Coupon Deleted Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
