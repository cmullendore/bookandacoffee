import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
      subject
    }
    readBooks {
      bookId
      title
      authors
      description
      image
      link
      subject
    }
    favoriteSubjects
    userProfilePicURL
  }
}
`;