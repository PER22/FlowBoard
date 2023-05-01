const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    //required: true
  },
  description: {
    type: String,
    //required: true
  },
  status:{
    type: String,
    enum:["to-do", "in-progress", "completed"]
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
  taskOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },
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

  projectOwner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  teamMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

  tasks:[TaskSchema]

}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema)