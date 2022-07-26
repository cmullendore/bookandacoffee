const faker = require('faker');

const db = require('../config/connection');
const { Book, User } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});
    console.log("deleted");
    const userData = [];

    for (let i = 0; i < 50; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();
    
        userData.push({ username, email, password });
      }
    

    console.log("inserting");
    const createdUsers = await User.collection.insertMany(userData);
    console.log("inserted");
}
)


