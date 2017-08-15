// ===== PACKAGES ===== //
// -------------------- //
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash-messages');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
const highlight = require('highlight.js');


// ===== MODLES ===== //
// ------------------ //
const User = require('./models/users');

// ===== ROUTES ===== //
// ------------------ //
const homeRoute = require('./routes/home');
const accountRoute = require('./routes/account');
const snippetRoute = require('./routes/snippet');

// ===== PASSPORT ===== //
// -------------------- //
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


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

// *** Store userid in session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// *** Get user form session via ID
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
//_______________________________________________________


// ===== APP CONFIG ===== //
//_______________________________________________________
const app = express()

// *** View Engine (Handlebars)
app.engine('handlebars', handlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');

// *** Session
app.use(
  session({
    secret: 'i have a secret',
    resave: false,
    saveUninitialized: true
  })
);

// *** Connect Passport to express
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// *** Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// *** Static Files
app.use(express.static('public'));

// *** Router
app.use('/', homeRoute)
app.use('/account', accountRoute)
app.use('/snippet', snippetRoute)
//_______________________________________________________




// ------------------------------- //
// ===== MONGOOSE CONNECTION ===== //
// ------------------------------- //
mongoose
  .connect('mongodb://localhost:27017/newdb', { useMongoClient: true })
  .then(() => app.listen(3000, () => console.log('listening on port 3000...')));
