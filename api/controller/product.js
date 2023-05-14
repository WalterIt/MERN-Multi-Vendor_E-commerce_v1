const express = require("express");
const path = require("path");
const Product = require("../model/product");
const Order = require("../model/order");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const {
  isSellerAuthenticated,
  isAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/auth");
const sendShopToken = require("../utils/ShopToken");
const Shop = require("../model/shop.js");

router.post(
  "/create-product",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productData = req.body;

      const shop = await Shop.findById(req.body.shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Not Found!", 400));
      } else {
        productData.shop = shop;
        const product = await Product.create(productData);
        res.status(201).json({
          success: true,
          message: "Product created Successfully!",
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all Products of a Shop
router.get(
  "/getproducts-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//Get all Products
router.get(
  "/getproducts",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Delete a Product of Shop
router.delete(
  "/delete-shop-product/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) return next(new ErrorHandler("Product Not Found!", 500));

      res.status(200).json({
        success: true,
        message: "Product Deleted Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Create a Review for a Product
router.put(
  "/create-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = { user, rating, comment, productId };

      const isReviewed = await product.reviews.find(
        (review) => review.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((review) => {
          if (review.user._id === req.user._id) {
            (review.rating = rating),
              (review.comment = comment),
              (review.user = user),
              (review.productId = productId);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let average = 0;

      product.reviews.forEach((review) => {
        average += review.rating;
      });

      product.ratings = average / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
        },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({ success: true, message: "Reviewed successfully" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
