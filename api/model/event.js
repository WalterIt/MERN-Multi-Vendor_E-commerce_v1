const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Event Product Name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter your Event Product Description"],
    },
    category: {
      type: String,
      required: [true, "Please enter your Event Product Category"],
    },
    startDate: {
      type: Date,
      required: [true, "Please enter your Event Initial Date"],
    },
    finishDate: {
      type: Date,
      required: [true, "Please enter your Event End Date"],
    },
    status: {
      type: String,
      default: "Running",
    },

    tags: {
      type: String,
    },
    originalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
      required: [true, "Please enter your Event Product Price!"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter your Event Product Stock!"],
    },
    images: [
      {
        type: String,
        required: [true, "Please enter your Event Product Images!"],
      },
    ],
    shopId: {
      type: String,
      required: true,
    },
    shop: {
      type: Object,
      required: true,
    },
    soldOut: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
