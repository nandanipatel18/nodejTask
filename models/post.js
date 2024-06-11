const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  location: {
    type: [Number],
    index: '2d'
},
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('posts', PostSchema);