const express = require('express');
const routes = express.Router();
const rainbow = require('rainbow-code');
const User = require('../models/users');
const Code = require('../models/code');




routes.get("/", function(req, res) {
  if (req.user) {
    name = req.user.firstName
    res.render('home', {name: name})
  } else {
    res.render('home')
  }
})



routes.get("/search", (req, res) => {
  var search = req.query.search

  Code.find( { $text: { $search: search } } )
  .then(code => res.render('home', {code: code}))
  .catch(err => console.log(err));
})


module.exports = routes
