// ===== PACKAGES ===== //
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash-messages');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const highlight = require('highlight.js');


// ===== MODLE VARIABLES ===== //
const data = require('./models/user');


// ===== routes ===== //
const homeRoute = require('./routes/home');
const accountRoute = require('./routes/account');


// const db = require('./db');
// // Routes
// // Mongoose
// const mongoose = require('mongoose');
// const bluebird = require('bluebird');


// set mongoose's promise library to be bluebird
mongoose.Promise = bluebird;

const app = express()

app.use(express.static('public'))
// Routes
app.use('/', homeRoute)
app.use('/login', sighnup)
// Views config
app.engine('handlebars', exphbs())
app.set('views', './views')
app.set('view engine', 'handlebars')
// Session
app.use(
  session({
    secret: 'dude',
    resave: false,
    saveUninitialized: true
  })
);
//tell express to use the bodyParser middleware to parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Mongoose
mongoose
  // connect to mongo via mongoose
  .connect('mongodb://localhost:27017/newdb', { useMongoClient: true })
  // now we can do whatever we want with mongoose.
  // configure session support middleware with express-session
  .then(() => app.listen(3000, () => console.log('ready to roll!!')))
