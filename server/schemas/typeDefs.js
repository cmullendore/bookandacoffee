// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`

input BookInput {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
}

input BioInput {
  biography: String
}

  type User {
    _id: ID
    username: String
    email: String
    isEmailConfirmed: Boolean
    emailConfirmationCode: String
    bookCount: Int
    savedBooks: [Book]
    readBooks: [Book]
    bookReviews: [BookReview]
    biography: String
  }

  type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type BookReview {
    _id: ID
    user: User
    book: Book
    title: String
    content: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type EmailConfirmation {
    success: Boolean
    message: String
  }

  type Query {
    me: User 
    user: User
    users: [User]
    bookReviews(skip: Int, limit: Int): [BookReview]
    bookReviewsCount: Int
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): User
    sendEmailConfirmation(email: String!, username: String!, confirmUrl: String!): EmailConfirmation
    confirmEmail(username: String!, code: String!): EmailConfirmation
    saveBook(book: BookInput!): User
    readBook(book: BookInput!): User
    removeBook(bookId: String!, listName: String!): User
    addReview(bookId: String!, content: String!, title: String!): User
    addBiography(bioData: BioInput!): User
  }`;

// export the typeDefs
module.exports = typeDefs;