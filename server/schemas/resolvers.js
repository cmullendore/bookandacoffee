const { AuthenticationError } = require('apollo-server-express');
const { User, BookReview, Book } = require('../models');
const { create } = require('../models/Book');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks')
                    .populate('readBooks')
                    .populate('bookReviews');
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        bookReviews: async (parent, { skip = 0, limit = 10 }) => {
            const reviews = await BookReview.find({})
                .sort({ createdOn: -1 })
                .skip(skip)
                .limit(limit);
            return reviews;
        },
        users: async (parent, args) => {
            const reviews = await User.find();
            return reviews;
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { book }, context) => {

            const { title, authors, description, image, link } = book;

            if (context.user) {
                const findBook = await Book.findOneAndUpdate({ bookId: book.bookId }, { title, authors, description, image, link }, { new: true, upsert: true })

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: findBook._id } },
                    { new: true }
                )
                    .select('-__v -password')
                    .populate('savedBooks')
                    .populate('readBooks')
                    .populate('bookReviews');

                return updatedUser;

            }

            throw new AuthenticationError('Incorrect credentials');
        },
        readBook: async (parent, { book }, context) => {

            const { title, authors, description, image, link } = book;

            if (context.user) {
                const findBook = await Book.findOneAndUpdate({ bookId: book.bookId }, { title, authors, description, image, link }, { new: true, upsert: true })

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { readBooks: findBook._id } },
                    { new: true }
                )
                    .select('-__v -password')
                    .populate('savedBooks')
                    .populate('readBooks')
                    .populate('bookReviews');

                return updatedUser;
            }

            throw new AuthenticationError('Incorrect credentials');
        },
        removeBook: async (parent, { bookId, listName }, context) => {
            if (context.user && listName === 'saved') {

                const updatedUserSavedBookList = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookId } }, // this works
                    { new: true }
                )
                    .select('-__v -password')
                    .populate('savedBooks')
                    .populate('readBooks')
                    .populate('bookReviews');

                return updatedUserSavedBookList;
            }
            else if (context.user && listName === 'read') {

                const updatedUserReadBookList = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { readBooks: bookId } }, // don't think this will work
                    { new: true }
                )
                    .select('-__v -password')
                    .populate('savedBooks')
                    .populate('readBooks')
                    .populate('bookReviews');

                return updatedUserReadBookList;
            }

            throw new AuthenticationError('Incorrect credentials');
        },
        addReview: async (parent, { bookId, content, title }, context) => {
            if (context.user) {
                const createReview = await BookReview.create({ user: context.user._id, book: bookId, content, title });

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { bookReviews: createReview._id } },
                    { new: true }
                )
                    .select('-__v -password')
                    .populate('savedBooks')
                    .populate('readBooks')
                    .populate('bookReviews');

                return updatedUser;
            }

            throw new AuthenticationError('Please Log In or Sign Up!');

        }
    }

}


module.exports = resolvers;