const { model, Schema } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    // select: false,
  },

  D_E_L_E_T_: {
    type: String,
    select: false,
    default: '',
  },
});

const User = model('User', schema);

module.exports = {
  User
}
