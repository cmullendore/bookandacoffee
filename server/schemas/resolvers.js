const { AuthenticationError } = require('apollo-server-express');
const { Book, User, BookReview } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        bookReviews: async (parent, args) => {
            const reviews = await BookReview.find({}).populate('user').populate('book').limit(5);
            
            return reviews;
        },
        users: async (parent, args) => {
            const users = await User.find({})
                .populate({path: 'bookReviews', populate: {path: 'book'}})
                .populate({path: 'readBooks', populate: {path: 'book'}})
                .populate({path: 'savedBooks', populate: {path: 'book'}});

            return users;
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
            if (context.user) {

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: book } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('Incorrect credentials');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('Incorrect credentials');
        }
    }
};

module.exports = resolvers;