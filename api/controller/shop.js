const express = require("express");
const path = require("path");
const Shop = require("../model/shop");
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

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const {
      name,
      email,
      description,
      address,
      zipCode,
      phoneNumber,
      password,
      avatar,
    } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      return next(new ErrorHandler("Shop already exists", 400));
    }

    const seller = {
      name,
      email,
      description,
      address,
      zipCode,
      phoneNumber,
      password,
      avatar,
    };

    try {
      const newShop = await Shop.create(seller);
      const { password, ...otherShopInfo } = newShop._doc;
      res.status(201).json({
        success: true,
        message: "Shop created Successfully!",
        otherShopInfo,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    // const activationToken = createActivationToken(user);

    // const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    // try {
    //   await sendMail({
    //     email: user.email,
    //     subject: "Activate your account",
    //     message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    //   });
    //   res.status(201).json({
    //     success: true,
    //     message: `please check your email:- ${user.email} to activate your account!`,
    //   });
    // } catch (error) {
    //   return next(new ErrorHandler(error.message, 500));
    // }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
// router.post(
//   "/activation",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { activation_token } = req.body;

//       const newUser = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET
//       );

//       if (!newUser) {
//         return next(new ErrorHandler("Invalid token", 400));
//       }
//       const { name, email, password, avatar } = newUser;

//       let user = await User.findOne({ email });

//       if (user) {
//         return next(new ErrorHandler("User already exists", 400));
//       }
//       user = await User.create({
//         name,
//         email,
//         avatar,
//         password,
//       });

//       sendToken(user, 201, res);
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// login Shop
router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email || !req.body.password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const shop = await Shop.findOne({ email }).select("+password");

      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exists!", 400));
      }

      const isPasswordValid = await shop.comparePassword(req.body.password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load Shop
router.get(
  "/getseller",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      //   console.log(req.seller);
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("SellerToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
