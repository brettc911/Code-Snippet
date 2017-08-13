const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const findOrCreate = require('mongoose-findorcreate');

// get a reference to Schema
const Schema = mongoose.Schema;

// create a schema for a user
const codSchema = new Code({
  codeSnippet: { type: String,
});

userSchema.plugin(findOrCreate);

// create a model for a User
const Code = mongoose.model('Code', codeSchema);

module.exports = Code;
