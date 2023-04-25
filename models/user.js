const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  avatar: String,
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);