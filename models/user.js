var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var bcrypt = require('bcrypt');
var SchemaTypes = mongoose.Schema.Types;

var UserSchema = mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    pet : {
      petname: String,
      species: String,
      health: Number,
      mood: Number,
      stats: [
        {
          name: String,
          last: SchemaTypes.Long,
          isSleeping: Boolean
        },
        {
          name: String,
          last: SchemaTypes.Long
        },
        {
          name: String,
          last: SchemaTypes.Long
        },
        {
          name: String,
          last: SchemaTypes.Long
        },
        {
          name: String,
          last: SchemaTypes.Long
        }
      ]
    }
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      email: ret.email,
      pet: ret.pet
    };
    return returnJson;
  }
});

UserSchema.methods.authenticated = function(password) {
  var user = this;
  var isAuthenticated = bcrypt.compareSync(password, user.password);
  return isAuthenticated ? user : false;
};

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);