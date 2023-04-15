// create token and saving that in cookies
const sendShopToken = (user, statusCode, res) => {
  // Get the JWT token
  const token = user.getJwtToken();

  // Set cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  // Send the response
  res.status(statusCode).cookie("SellerToken", token, cookieOptions).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendShopToken;
