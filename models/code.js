const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const findOrCreate = require('mongoose-findorcreate');

// get a reference to Schema
const Schema = mongoose.Schema;

// create a schema for some code
const codeSchema = new Schema({
  title: { type: String, requried: true },
  tags: { type: String },
  codeSnippet: { type: String },
  author: { type: String }
})

codeSchema.plugin(findOrCreate);

// create a model for some code
const Code = mongoose.model('code', codeSchema);

module.exports = Code;
