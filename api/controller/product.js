const express = require("express");
const path = require("path");
const Product = require("../model/product");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isSellerAuthenticated } = require("../middleware/auth");
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
      const products = await Product.find();

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

module.exports = router;
