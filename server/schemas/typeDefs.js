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

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
    readBooks: [Book]
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

  type Query {
    me: User 
    user: User
    users: [User]
    bookReviews: [BookReview]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    readBook(book: BookInput!): User
    removeBook(bookId: String!, listName: String!): User
    addReview(bookId: String!, userId: String, content: String): User
  }

`;

// export the typeDefs
module.exports = typeDefs;