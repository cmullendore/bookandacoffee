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
      token
      user {
        _id
        username
      }
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
        bookId
        authors
        description
        title
        image
        link
      }
      readBooks {
        bookId
        authors
        description
        title
        image
        link
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
        bookId
        authors
        description
        title
        image
        link
      }
      readBooks {
        bookId
        authors
        description
        title
        image
        link
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
      }
  }
`;


// export const ADD_REVIEW = gql`
// mutation saveBook($bookId: String!) {
//     removeBook(
//         bookId: $bookId
//     ) {
//         _id
//         username
//         email
//         savedBooks {
//           bookId
//           title
//           authors
//           description
//           image
//           link
//         }
//         readBooks {
//           bookId
//           title
//           authors
//           description
//           image
//           link
//         }
//     }
//   }
// `