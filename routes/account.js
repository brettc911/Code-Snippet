
// ===== PACKAGES ===== //
const express = require('express');
const routes = express.Router();
const User = require('../models/user');
const flash = require('express-flash-messages');
const bodyParser = require('body-parser');

// ===== PASSPORT ===== //
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// --- Connect Passport to express
routes.use(passport.initialize());
routes.use(passport.session());
routes.use(flash());

// --- Passport config
passport.use(
  new LocalStrategy(function(email, password, done) {
    // console.log('LocalStrategy', email, password);
    User.authenticate(email, password)
      // Success!
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, null, { message: 'There was no user with this email and password.' });
        }
      })
      // Error!
      .catch(err => done(err));
  })
);

// // Local login
// routes.get("/sighnin", function(req, res) {
//   res.render('login', { failed: req.query.failed })
// })
//
// routes.get("/sighnup", function(req, res) {
//   res.send('sighn up please', { failed: req.query.failed })
// })


// --- Store userid in session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// -- Get user form session via ID
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});


// ===== REGISTER NEW USER ===== //
routes.get('/signup', (req, res) => {
  res.render('signup');
});

// -- Submit Registration
routes.post('/register', (req, res) => {
  let user = new User(req.body);
  user.provider = 'local';
  user.setPassword(req.body.pwd);

  user
    .save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

// ===== LOGIN ===== //

// Login Form
routes.get('/login', (req, res) => {
  //console.log('errors:', res.locals.getMessages());
  res.render('login', { failed: req.query.failed });
});

// Login Submission
routes.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?failed=true',
    failureFlash: true
  })
);


module.exports = routes;
