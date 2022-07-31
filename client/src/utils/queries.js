import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    bookCount
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