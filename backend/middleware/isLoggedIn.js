const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.vaildtoken = async (req, res, next) => {
  let token = req.headers.authorization || req.headers.token;

  if (!token) {
    return res.status(401).json({
      msg: "token not found please login",
    });
  }
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const secret = process.env.SECERT_KEY;
    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({
        msg: "The user belonging to this token does no longer exist.",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      msg: "unvaildtoken please login again",
    });
  }
};
