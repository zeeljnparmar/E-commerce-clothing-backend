const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.testController = (req, res) => {
  res.send("controller");
};

exports.loginController = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(500).send("Bad request");
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("No user found");
    }
    const match = await bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
      return res.send(402).send("Invalid password");
    }
    let token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).send(token);
  } catch (error) {
    return res.status(500).send(err);
  }
};

exports.register = async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      res.status(400).send("user already exists");
    }
    const pass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: pass,
      email: req.body.email,
      contactno: req.body.contactno,
      address: req.body.address,
    });
    const data = await user.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};
