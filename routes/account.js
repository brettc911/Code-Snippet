
// ===== PACKAGES ===== //
// -------------------- //
const express = require('express');
const User = require('../models/users');
const flash = require('express-flash-messages');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = express.Router();


// ===== REGISTER NEW USER ===== //

routes.get('/signup', (req, res) => {
  res.render('signup');
});

// *** Submit Registration
routes.post('/register', (req, res) => {
  let user = new User(req.body);
  user.provider = 'local';
  user.setPassword(req.body.password);

  user
    .save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

// ===== LOGIN ===== //

// *** Login Form
routes.get('/login', (req, res) => {
  console.log('errors:', res.locals.getMessages());
  res.render('login', { failed: req.query.failed });
});

// *** Login Submission
routes.post('/auth',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/account/login?failed=true',
    failureFlash: true
  })
);

// *** Logout User
routes.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/account/login')
})


module.exports = routes;
