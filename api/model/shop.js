const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Shop Name!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password should be greater than 6 characters"],
      select: false,
    },
    address: {
      type: String,
      required: [true, "Please enter your Address!"],
    },
    zipCode: {
      type: String,
      required: [true, "Please enter your ZIP Code!"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your Phone Number!"],
    },
    description: {
      type: String,
      required: [true, "Please add a Description!"],
    },
    role: {
      type: String,
      default: "Seller",
    },
    avatar: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

// Hash password
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// comapre password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);
