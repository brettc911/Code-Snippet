
// ===== PACKAGES ===== //
// -------------------- //
const express = require('express');
const User = require('../models/users');
const flash = require('express-flash-messages');
const bodyParser = require('body-parser');
const routes = express.Router();


// ===== PASSPORT ===== //
// -------------------- //
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// *** Connect Passport to express
routes.use(passport.initialize());
routes.use(passport.session());
routes.use(flash());


// *** Passport config
//_______________________________________________________
passport.use(
  new LocalStrategy(function(username, password, done) {
    // console.log('LocalStrategy', username, password);
    User.authenticate(username, password)
      // Success!
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, null, { message: 'There was no user with this username and password.' });
        }
      })
      // Error!
      .catch(err => done(err));
  })
);
//_______________________________________________________


// *** Store userid in session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// *** Get user form session via ID
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});


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
