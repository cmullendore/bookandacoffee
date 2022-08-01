import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
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