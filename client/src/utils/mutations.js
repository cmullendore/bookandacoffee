import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      username
      email
      isEmailConfirmed
      emailConfirmationCode
    }
  }
`;

export const SEND_EMAIL_CONFIRMATION = gql`
  mutation sendEmailConfirmation($username: String!, $email: String!, $confirmUrl: String!) {
    sendEmailConfirmation(username: $username, email: $email, confirmUrl: $confirmUrl) {
      success
      message
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
      readBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
      bookReviews {
        _id
        user {
          _id
          username
        }
        book {
          _id
          bookId
          title
          authors
          description
          image
          link
        }
        title
        content
        createdAt
      }
    }
  }
`;

export const READ_BOOK = gql`
  mutation readBook($book: BookInput!) {
    readBook(book: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
      readBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
      bookReviews {
        _id
        user {
          _id
          username
        }
        book {
          _id
          bookId
          title
          authors
          description
          image
          link
        }
        title
        content
        createdAt
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!, $listName: String!) {
    removeBook(
      bookId: $bookId,
      listName: $listName
    ) {
        _id
        username
        email
        savedBooks {
          _id
          bookId
          title
          authors
          description
          image
          link
        }
        readBooks {
          _id
          bookId
          title
          authors
          description
          image
          link
        }
        bookReviews {
          _id
          user {
            _id
            username
          }
          book {
            _id
            bookId
            title
            authors
            description
            image
            link
          }
          title
          content
          createdAt
        }
      }
  }
`;


export const ADD_REVIEW = gql`
mutation addReview($bookId: String!, $content: String!, $title: String!) {
    addReview(bookId: $bookId, content: $content, title: $title) {
      _id
      username
      email
      savedBooks {
        _id
        bookId
        title
        authors
        description
        image
        link
      }
      readBooks {
        _id
        bookId
        title
        authors
        description
        image
        link
      }
      bookReviews {
        _id
        user {
          _id
          username
        }
        book {
          _id
          bookId
          title
          authors
          description
          image
          link
        }
        title
        content
        createdAt
      }
    }
  }
`


export const CONFIRM_EMAIL = gql`
mutation confirmEmail($username: String!, $code: String!) {
  confirmEmail(username: $username, code: $code) {
      success
      message
    }
  }
`