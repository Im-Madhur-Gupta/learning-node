const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "iamvengeance"); // will throw error if not valid
    const user = await User.findOne({
      _id: decoded._id,
      // searches for token value inside of the tokens array
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    // storing user as a ppt on req obj so that the other middlewares can use it
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please Authenticate." });
  }
};

module.exports = auth;
