// create token and saving that in cookies
const jwt = require("jsonwebtoken");

const sendShopToken = (seller, statusCode, res) => {
  // Create the JWT token
  const payload = {
    sellerId: seller._id,
    sellerEmail: seller.email,
    // add any other relevant data to the payload
  };

  const secretKey = process.env.JWT_SECRET_KEY;
  const tokenOptions = { expiresIn: process.env.JWT_EXPIRES };
  const token = jwt.sign(payload, secretKey, tokenOptions);

  // Set cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  // Send the response
  res.status(statusCode).cookie("SellerToken", token, cookieOptions).json({
    success: true,
    seller,
    token,
  });
};

module.exports = sendShopToken;
