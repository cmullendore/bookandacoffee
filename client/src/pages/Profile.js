import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId, getSavedBookIds, saveBookIds } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK, READ_BOOK } from '../utils/mutations';
import ReviewForm from '../components/ReviewForm';

/* //import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';

import { REMOVE_BOOK } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/react-hooks'; */

const Profile = () => {
   
  const [userData, setUserData] = useState();

  const [showReview, setShowReview] = useState(false);

  const [reviewBookData, setReviewBookData] = useState({});

  const [removeSavedBook, { errorRemoveSave }] = useMutation(REMOVE_BOOK);
  const [removeReadBook, { errorRemoveRead }] = useMutation(REMOVE_BOOK);

  const [readBook, { errorRead: err }] = useMutation(READ_BOOK);
  
  const userProfile = Auth.getProfile();

  const [readBookIds, setReadBookIds] = useState(getSavedBookIds({ name: 'read_books_list' }));

  let { loading, data } = useQuery(QUERY_ME, {
    variables: { username: userProfile.data.username },
  });

  useEffect(() => {
      if (data) {
        setUserData(data.me);
      }
  }, [data]);

  useEffect(() => {
    saveBookIds([], readBookIds);
  }, [readBookIds]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteSavedBook = async (bookId, localStorageId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    //loading = true;
    try {
      const removeBook = await removeSavedBook({
        variables: { bookId, listName: 'saved' }
      });
      setUserData(removeBook.data.removeBook);
      //setUserData(data.me);
      // upon success, remove book's id from localStorage
      removeBookId(localStorageId, { name: 'saved_books_list '});
    } catch (err) {
      console.errorRemoveSave(err);
    }
  };

  const handleDeleteReadBook = async (bookId, localStorageId) => {
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
      console.errorRemoveRead(err);
    }
  };

  function handleWriteReview(book) {
    setReviewBookData({ ...book });
    setShowReview(true);
  };

  async function handleReadBook(book) {

    const { _id, bookId, authors, description, title, image, link } = book;
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await readBook({
        variables: { book: { bookId, authors, description, title, image, link } }
      });

      if (error) {
        throw new Error('Something went wrong!');
      }

      setReadBookIds([...readBookIds, bookId]);

    } catch (err) {
      console.errorRead(err);
    }

    handleDeleteReadBook(_id, bookId);
  }

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (data && !userData)
  {
    return <h2>CONFIGURING...</h2>;
  }
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing Profile!</h1>
          <br></br>
<<<<<<< HEAD
          <h2>Reading Brief about Me</h2>
          <br></br>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
          <h2>Books I've Read</h2>
          <br></br>
          <h2>Books I want to Read</h2>
          <br></br>
          <h2>Book Reviews</h2>
          <br></br>
          <h2>Favorite Book Genres</h2>

=======
          <h2>Bio: asdfasdfasdf</h2>
        </Container>
        <Container>
          <h3>My Saved Books:
          <>
      {/* <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron> */}
      <div className='container'>
        <h5 className='text-center'>
          {userData.savedBooks.length
            ? `You have ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h5>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <a href={book.link} target='_blank' rel='noopener noreferrer'>Review on Google Books</a>
                  <p className='small'>Authors: {book.authors}</p>
                  <p>{book.description}</p>
                  <Button
                    className='btn-block btn-info'
                    onClick={() => handleReadBook(book)}>Finished Reading Book!
                  </Button>
                  {/* This was originally "book.bookId", but remember that bookId is the GOOGLE id... we need the database "_id" */}
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteSavedBook(book._id, book.bookId)}>
                    Remove Book From List!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </div>
    </>

          </h3>
          <br>
          </br>
          <h3>My Read Books:
          <>
      {/*<Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing Read Books!</h1>
        </Container>
        </Jumbotron>*/}
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
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteReadBook(book._id, book.bookId)}>
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
          </h3>
>>>>>>> 3152c46 (Added array display to user profile)
        </Container>
      </Jumbotron>
    </>
  );
};
/* 
    
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}; */

export default Profile;
