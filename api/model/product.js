const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Product Name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter your Product Description"],
    },
    category: {
      type: String,
      required: [true, "Please enter your Product Category"],
    },
    tags: {
      type: String,
    },
    originalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
      required: [true, "Please enter your Product Price!"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter your Product Stock!"],
    },
    images: [
      {
        type: String,
        required: [true, "Please enter your Product Images!"],
      },
    ],
    reviews: [
      {
        user: { type: Object },
        rating: { type: Number },
        comment: { type: String },
        productId: { type: String },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    ratings: {
      type: Number,
    },
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

module.exports = mongoose.model("Product", productSchema);
