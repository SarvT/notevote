const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/', (req, res)=>{
    console.log("Hello from the server");
    const newUser = User(req.body);
    newUser.save()
    res.json( "Welcome to my API");
})

module.exports = router;