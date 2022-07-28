const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const Book = require('./Book');

const userSchema = new Schema(
  { 
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      }
    ],
    // set readBooks to be an array of data that keeps track of already read books
    readBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      }
    ],
    bookReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BookReview'
      }
    ],
    biography: {
      type: String,
      required: false
    },
    favoriteSubjects: {
      type: [String],
      required: false
    },
    userProfilePicURL: {
      type: String,
      default: "https://tinyurl.com/4dzr8d73",
      required: false
    }

  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model('User', userSchema);

module.exports = User;
