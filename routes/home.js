const express = require('express');
const routes = express.Router();
const highlight = require('highlight.js');
const rainbow = require('rainbow-code');

var highlighted = rainbow.colorSync('var foo = 3 + 3', 'javascript');

routes.get("/", function(req, res) {
  console.log(highlighted);
  res.render('home', {highlighted: highlighted})
})

module.exports = routes
