// ===== PACKAGES ===== //
// -------------------- //
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


// *** User Schema Creation
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: {type: String}
});

// ===== B-CRYPT CONFIG ===== //
// -------------------------- //

// Create encrypted password for database storage
userSchema.methods.setPassword = function(password) {
  this.passwordHash = bcrypt.hashSync(password, 8);
};

// Individual users can authenticate their passwordHash
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// Static method to authenticate a user
userSchema.statics.authenticate = function(username, password) {
  return (
    User.findOne({ username: username })
      // validate the user's password
      .then(user => {
        if (user && user.validatePassword(password)) {
          console.log('User and Password valid');
          return user;
        } else {
          return null;
        }
      })
  );
};

const User = mongoose.model('user', userSchema);

module.exports = User;
