const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcript = require("bcrypt");

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.SECERT_KEY, {
    expiresIn: process.env.EXPIREIN,
  });

exports.reqister = async (req, res, next) => {
  try {
    const { name, email, password, age, confirmpassword } = req.body;
    const user = new User({ name, email, password, age, confirmpassword });
    await user.save();
    const token = signToken(user._id);
    res.status(201).json({
      status: "successfully",
      token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcript.compare(password, user.password))) {
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }
    const token = signToken(user._id);
    res.status(200).json({
      status: "successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};
