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
      subject
    }
    readBooks {
<<<<<<< HEAD
=======
      _id
>>>>>>> main
      bookId
      title
      authors
      description
      image
      link
<<<<<<< HEAD
      subject
    }
    favoriteSubjects
    userProfilePicURL
=======
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
>>>>>>> main
  }
}
`;