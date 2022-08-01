const { Schema, model } = require('mongoose');
<<<<<<< HEAD

=======
>>>>>>> main

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
<<<<<<< HEAD
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
  },
  subject: {
    type: String,
    required: true
  }

}
=======
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
  }
);
>>>>>>> main

const Book = model('Book', bookSchema);

module.exports = Book;
