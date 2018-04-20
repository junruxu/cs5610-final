var mongoose = require("mongoose");

var BlogSchema = mongoose.Schema({
  content: String,
  rating: Number,
  image_urls: [String],
  title: String,
  reviews: [String],
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
  dateCreated: {type: Date, default: Date.now}
}, {collection:'blog'});

module.exports = BlogSchema;
