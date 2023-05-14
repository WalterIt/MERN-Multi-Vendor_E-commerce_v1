const express = require("express");
const User = require("../model/user");
const Order = require("../model/order");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {
  isAuthenticated,
  isSellerAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/auth");
const Product = require("../model/product");

// Create New order
router.post(
  "/create-order",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      // Group Cart Items by ShopId

      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // Create an Order for each Shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all Order of a User
router.get(
  "/getorders/:userId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all Order of a Seller
router.get(
  "/getorders-seller/:shopId",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update Order Status for Seller
router.put(
  "/update-order-status/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return next(new ErrorHandler("Order not found!", 400));
      if (req.body.status === "Transfered to delivery Partner") {
        order.cart.forEach(async (order) => {
          await updateProduct(order._id, order.quantity);
        });
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateProduct(id, quantity) {
        const product = await Product.findById(id);

        product.stock -= quantity;
        product.soldOut += quantity;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Order Refund
router.put(
  "/order-refund/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) return next(new ErrorHandler("Order not found!", 400));

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Requested for Refund Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Accept the Refund Order by Seller
router.put(
  "/order-refund-success/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) return next(new ErrorHandler("Order not found!", 400));

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (order) => {
          await updateProduct(order._id, order.quantity);
        });
      }

      async function updateProduct(id, quantity) {
        const product = await Product.findById(id);

        product.stock += quantity;
        product.soldOut -= quantity;

        await product.save({ validateBeforeSave: false });
      }

      res.status(200).json({
        success: true,
        message: "Order Refunded Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Create get all Order of a admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
