const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const { Book, User } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});
  await Book.deleteMany({});
    console.log("deleted");
    const userData = [];

    for (let i = 0; i < 50; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();
    
        userData.push({ username, email, password });
      }

    const createdUsers = await User.collection.insertMany(userData);
console.log(createdUsers);

    const bookData = [];

    for (let i = 0; i < 50; i += 1) {
        const authors = [ "Author Name" ];
        const description = faker.lorem.paragraph();
        const bookId = faker.internet.url();
        const title = faker.random.words(5);
    
        userData.push({ authors, description, bookId, title });
      }

    const createdBooks = await Book.collection.insertMany(bookData);
console.log(createdBooks);
}
)


