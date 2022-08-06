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
export const QUERY_BOOKREVIEWS = gql`

  query BookReviews($skip: Int, $limit: Int) {
    bookReviews(skip: $skip, limit: $limit) {
      _id
      title
      content
      user {
        _id
        username
      }
      book {
        image
        link
        title
      }
    }
  }
`;

export const QUERY_BOOKREVIEWSCOUNT = gql`
  query {
    bookReviewsCount
  }
`;