const express = require("express");
const User = require("./../models/usersModel");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const protectUser = require("./../middleware/protectUser");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const JWT_SECRET = process.env.JWT_SECRET;

router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const oldUser = await User.findOne({ email: req.body.email });
      if (oldUser) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      var token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        JWT_SECRET
      );
      success = true;
      //res.send(req.body);
      res.status(201).json({ success, token });
      //res.status(200).send(newUser)
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ message: "Please try to login with correct credentials" });
      }

      const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET);
      success = true;

      res.status(201).json({ success, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/getuser", protectUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
