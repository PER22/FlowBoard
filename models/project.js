const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    //required: true
  },
  description: {
    type: String,
    //required: true
  },
  priority: {
    type: String,
    enum: ["P1", "P2", "P3", "P4", "P5"]
  },
  due: {
    type: Date
  },
  teamMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    //required: false
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});



const ProjectSchema = new Schema({
  title: {
    type: String,
    //required: true
  },
  description: {
    type: String
  },
  priority: {
    type: String,
    enum: ["P1", "P2", "P3", "P4", "P5"]
  },
  due: {
    type: Date
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },
  teamMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    //required: false
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
    //required: false
  }]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
