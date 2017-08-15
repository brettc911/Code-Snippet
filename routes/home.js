const express = require('express');
const routes = express.Router();
const rainbow = require('rainbow-code');
const User = require('../models/users');




routes.get("/", function(req, res) {

  console.log(User.find( {username: "brettc911"} ))
  // console.log(User.find( { _id: ObjectId(id) } ));
  res.render('home')
})


module.exports = routes
