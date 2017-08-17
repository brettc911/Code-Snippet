const express = require('express');
const routes = express.Router();
const passport = require('passport');
const User = require('../models/users');
const Code = require('../models/code');
const flash = require('express-flash-messages');
const bodyParser = require('body-parser');





routes.get("/create", (req, res) => {
  if (req.user) {
    name = req.user.firstName
    res.render('snippet', {name: name})
  } else {
    res.render('snippet', {error: 'Must be logged in to create snippets'})
  }
})

routes.post("/submit", (req, res) => {
  if (req.user) {
    req.body.author = req.user.username


    let code = new Code(req.body);
    code.provider = 'local';
    code
      .save()
      .then(() => res.redirect('/snippet/create'))
      .catch(err => console.log(err));
  } else {
    res.redirect('/snippet/create')
  }



});




module.exports = routes
