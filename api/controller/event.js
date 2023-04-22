const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSellerAuthenticated } = require("../middleware/auth");
const Shop = require("../model/shop.js");
const Event = require("../model/event");

router.post(
  "/create-event",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventData = req.body;

      const shop = await Shop.findById(req.body.shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Not Found!", 400));
      } else {
        eventData.shop = shop;
        const event = await Event.create(eventData);
        res.status(201).json({
          success: true,
          message: "Event created Successfully!",
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all Events
router.get(
  "/getevents",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find();

      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all Events Products of a Shop
router.get(
  "/getevents-shop/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Delete an Event Product of Shop
router.delete(
  "/delete-shop-event/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);

      if (!event) return next(new ErrorHandler("Event Not Found!", 500));

      res.status(200).json({
        success: true,
        message: "Event Deleted Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
