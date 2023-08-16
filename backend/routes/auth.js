const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const profile = require("../middleware/profile");
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "dsjshbkagigaicaxkdgi";

router.post(
  "/signup",
  [
    body("name").isLength({ min: 4 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    let success = false;
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=false;
        return res.status(405).json({
          success,
          error: "Already signed up, Try logging in.",
        });
      }
      const salt = await bcryptjs.genSalt(10);
      let spswrd = await bcryptjs.hash(req.body.password, salt);
      user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: spswrd,
      });
      // payload
      const data = {
        user: {
          id: user.id,
        },
      };
      // res.send(user);
      const jwt_data = jwt.sign(data, JWT_SECRET);
      console.log(jwt_data);
      success=true
      res.json({ success, jwt_data });
    } catch (error) {
      // .then((user) => res.json(user))
      // .catch(err=>{
      //   res.json({error: "Already signed up, Try logging in.", message:err.message, status:405})
      // })
      //   return res.send(`Hello, ${req.query.person}!`);
      console.error(error.message);
      res.status(500).send("Somme error occured, please try again!");
    }
  }
  // console.log("Hello from the server");
  // const newUser = User(req.body);
  // newUser.save();
  // res.json("Welcome to my API");
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({success, error:"Invalid credintials!"});
      }
      const isPassValid = await bcryptjs.compare(password, user.password);
      if (!isPassValid) {
        success = false;
        return res.status(400).json({success, error:"Invalid credintials!"});
        // throw Error({success, "Invalid credintials!"});
      }
      // payload
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwt_data = await jwt.sign(data, JWT_SECRET);
      success = true
      res.send({ success, jwt_data });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(success, "Somme error occured, please try again!");
    }
  }
);

router.post("/user", profile, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res
      .status(500)
      .send("Something went wrong! Please check your inputs and try again.");
  }
});

module.exports = router;
