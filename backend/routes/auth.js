const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const jwtSecret = "Thisisarandomstringforjwttoken12345";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    //check for exisiting email id
    let success = false;
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json({ success, error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    try {
      //writing to database
      await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      // authentication Token, User will get this when he do signup and login
      // previous user variable is null but this time it should have some value as we just appended the user data into the database
      const user = await User.findOne({ email: req.body.email });
      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      success = true;
      res.status(200).json({ success, authToken });
    } catch (error) {
      console.log(error);
      success = false;
      res.status(400).json({ success, error: error });
    }
  }
);

// ROUTE 2:authenticate a User using: POST "/api/auth/login"
router.post(
  "/login",
  [body("email", "Enter a valid email").isEmail()],
  [body("password", "Invalid password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    // Checking if the entered email exists or not in the db
    const email = req.body.email;
    try {
      // checking if the email provided exists or not in the
      let user = await User.findOne({ email });
      let success = false;
      console.log("email", email);
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
        success = false;
      }
      // verifying passwords
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
        success = false;
      }
      // after verification give user auth Token
      // authentication Token, User will get this when he do signup and login
      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      console.log(authToken);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error);
      success = false;
      res.status(500).json(success, error);
    }
  }
);

// ROUTE 3:Get user details: POST "/api/auth/getuser" , login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id; //req.user from fetchUser
    const user = await User.findById(userId).select("-password"); // getting user data except the password
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
