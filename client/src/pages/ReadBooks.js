import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import ReviewForm from '../components/ReviewForm';


const ReadBooks = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const [removeReadBook, { error }] = useMutation(REMOVE_BOOK);

  const [userData, setUserData] = useState();

  const [showReview, setShowReview] = useState(false);

  const [reviewBookData, setReviewBookData] = useState({});

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId, localStorageId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const removeBook = await removeReadBook({
        variables: { bookId, listName: 'read' }
      });

      setUserData(removeBook.data.removeBook);

      if (error) {
        throw new Error('Something went wrong!');
      }

      // upon success, remove book's id from localStorage
      removeBookId(localStorageId, { name: 'read_books_list' });
    } catch (err) {
      console.error(err);
    }
  };

  function handleWriteReview(book) {
    setReviewBookData({ ...book });
    setShowReview(true);
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (data && !userData) {
    // While we're loading we don't want to call setUserData because there's no data yet.
    // but once data IS loaded, call setUserData... but only if userData is null.
    // If we called setUserData every time userData changed, we'd be in an infinite loop.
    setUserData(data.me);
    return <h2>CONFIGURING...</h2>;
  } 

// THIS BOOK IS USED FOR TESTING ONLY
const book = {
  title: "test book title",
  description: 'test book description',
  image: "./user_placeholder.png"
}


// const [showReview, setShowReview] = React.useState(false);
//   }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing Read Books!</h1>
        </Container>
      </Jumbotron>
      <div className='container'>
        <h5 className='text-center'>
          {userData.readBooks.length
            ? `You have read ${userData.readBooks.length} ${userData.readBooks.length === 1 ? 'book' : 'books'}:`
            : "You haven't read any book yet!"}
        </h5>
        {showReview && <ReviewForm book={reviewBookData} showReview={showReview} setShowReview={setShowReview} />}
        <CardColumns>
          {userData.readBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <a href={book.link} target='_blank' rel='noopener noreferrer'>Review on Google Books</a>
                  <p className='small'>Authors: {book.authors}</p>
                  {/* <p>{book.description}</p> */}
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book._id, book.bookId)}>
                    Remove Book From List!
                  </Button>
                  <Button className='btn-block btn-info' onClick={() => handleWriteReview(book)}>
                    Write a Book Review!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </div>
    </>
  );
};

export default ReadBooks;