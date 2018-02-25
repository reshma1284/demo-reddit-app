var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  postDate:{
    type: Date,
    default: Date.now
  },
  upVote:{
    type: Number,
    default: 0
  }
})



module.exports = mongoose.model('Post',PostSchema);
