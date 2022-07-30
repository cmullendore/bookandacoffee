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
            if (context.user) {

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('Incorrect credentials');
        },
        readBook: async (parent, { book }, context) => {
            if (context.user) {

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { readBooks: book } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('Incorrect credentials');
        },
        removeBook: async (parent, { bookId, listName }, context) => {
            if (context.user) {
                switch (listName) {
                    case 'saved':
                        const updatedUserSavedBookList = await User.findByIdAndUpdate(
                            { _id: context.user._id },
                            { $pull: { savedBooks: { bookId } } },
                            { new: true }
                        );

                        return updatedUserSavedBookList;
                    case 'read':
                        const updatedUserReadBookList = await User.findByIdAndUpdate(
                            { _id: context.user._id },
                            { $pull: { readBooks: { bookId } } },
                            { new: true }
                        );

                        return updatedUserReadBookList;
                    default:
                        break;
                }
            }

            throw new AuthenticationError('Incorrect credentials');
        }
        /* - The final version of this SHOULD use the context
        addReview: async (parent, { bookId, userId, content }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );

                return updatedUser;
            }
        
        }
        */
    }
};

module.exports = resolvers;