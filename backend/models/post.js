const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  offense: {
    type: String,
    required: true,
  },
  adNumber: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }

});

module.exports = mongoose.model('Post',postSchema);
