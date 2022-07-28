const faker = require('faker');
const bcrypt = require('bcrypt');

const db = require('../config/connection');
const { Book, User, BookReview } = require('../models');

db.once('open', async () => {
  await BookReview.deleteMany({});
  await User.deleteMany({});
  await Book.deleteMany({});
  console.log("deleted");

  const userData = [];
  for (let i = 0; i < 50; i += 1) {
    const username = `User ${i}`;
    const email = `${i}@noreply.com`;
    const password = await bcrypt.hash('password', 10);
    const savedBooks = [];
    const readBooks = [];
    const bookReviews = [];
    userData.push({ username, email, password, savedBooks, readBooks, bookReviews });
  }
  console.log("inserting users");
  const usersResult = await User.collection.insertMany(userData);
  const users = usersResult.ops;

  const bookData = [];
  for (let i = 0; i < 50; i += 1) {
    const title = `Title of book ${i}`;
    const authors = [`Author of book ${i}`];
    const description = `Description of book ${i}`;
    const image = `image for book ${i}`;
    const link = `link of book ${i}`;

    bookData.push({ title, authors, description, image, link });
  }
  console.log("inserting books");
  const booksResult = await Book.collection.insertMany(bookData);
  const books = booksResult.ops;


  const reviewData = [];
  for (let i = 0; i < 50; i += 1) {
    const book = books[i]._id;
    const user = users[i]._id;
    const content = `Review content for book ${i}`

    reviewData.push({ book, user, content });
  }
  console.log("inserting reviews");
  const reviewsResult = await BookReview.collection.insertMany(reviewData);
  const reviews = reviewsResult.ops;
  console.log("Reviews output");
  console.log(reviews);

  /*
    At this point the primary objects are created and have references
    (like BookReview to Book, User)... But the referenced objects
    don't have a reference to the review, like User. So, iterate through again
    and populate all of them.
  */
    const dbUsers = await User.find();
    for (i = 0; i < users.length; i++) {
      dbUsers[i].bookReviews = [reviews[i]];
    }
    const updateResp = await User.bulkSave(dbUsers);

  process.exit();
}
)


