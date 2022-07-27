const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    authors: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    // saved book id from GoogleBooks
    bookId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Book = model('Book', bookSchema);

module.exports = Book;
