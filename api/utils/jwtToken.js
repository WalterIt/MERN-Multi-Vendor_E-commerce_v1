const sendToken = (res, user, statusCode) => {
  // Get the JWT token
  const token = user.getJwtToken();

  // Set cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  // Send the response
  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
