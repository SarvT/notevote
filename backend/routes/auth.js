const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("name").isLength({ min: 4 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then((user) => res.json(user))
      .catch(err=>{
        res.json({error: "Already signed up, Try logging in.", message:err.message, status:405})
      })
    //   return res.send(`Hello, ${req.query.person}!`);
    }

    res.send({ errors: result.array() });
    // console.log("Hello from the server");
    // const newUser = User(req.body);
    // newUser.save();
    // res.json("Welcome to my API");
  }
);

module.exports = router;
