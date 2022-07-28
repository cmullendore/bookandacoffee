const { Schema, model, SchemaTypes, SchemaType } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const Book = require('./Book');
const User = require('./User');

const bookReviewSchema = new Schema(
  { 
    // set readBooks to be an array of data that keeps track of already read books
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    book:
      {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      }
    ,
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdOn: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const BookReview = model('BookReview', bookReviewSchema);

module.exports = BookReview;
