const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
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
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(405).json({
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
      res.json({ jwt_data });
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
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        throw Error("Invalid credintials!");
      }
      const isPassValid = await bcryptjs.compare(password, user.password);
      if (!isPassValid) {
        throw Error("Invalid credintials!");
      }
      // payload
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwt_data = await jwt.sign(data, JWT_SECRET);
      res.send({ jwt_data });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Somme error occured, please try again!");
    }
  }
);

module.exports = router;
