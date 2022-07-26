const faker = require('faker');

const db = require('../config/connection');
const { Book, User } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});
}
)


