const express = require('express');
const routes = express.Router();
const rainbow = require('rainbow-code');
const Code = require('../models/code');




routes.get("/create", (req, res) => {

  res.render('snippet')
})

routes.post("/submit", (req, res) => {
  let code = new Code(req.body);
  code.provider = 'local';

  code
    .save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});




module.exports = routes
