
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


// ===== PROFILE ===== //

//*** Main Profile
routes.get('/profile', (req, res) => {
  if (req.user) {
    user = req.user
    name = req.user.firstName
    res.render('profile', {user: user, name: name})
  } else {
    res.send('create a profile fail message...somehow')
  }
})
// *** Update Profile Information
routes.post('/profile/update', (req, res) => {
  User.findById(req.user.id)
  .then(user => {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.username = req.body.username || ser.username
    user.email = req.body.email || user.email
    user.setPassword(req.body.password)
    user
      .save()
      .then(() => res.redirect('/'))
      .catch(err => console.log(err));
  })
})




module.exports = routes;
