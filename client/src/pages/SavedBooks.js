import React, { useEffect, useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId, getSavedBookIds, saveBookIds } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK, READ_BOOK } from '../utils/mutations';


const SavedBooks = () => {

  const { loading, data } = useQuery(QUERY_ME);

  // Since we're using the userData object to render the component
  // we have to track it as state. Whenever we call setUserState, 
  // the rendered components will update.
  const [userData, setUserData] = useState();

  console.log(userData);

  const [removeSavedBook, { error }] = useMutation(REMOVE_BOOK);

  const [readBook, { error: err }] = useMutation(READ_BOOK);

  // create state to hold read bookId values
  const [readBookIds, setReadBookIds] = useState(getSavedBookIds({ name: 'read_books_list' }));

  useEffect(() => {
    saveBookIds([], readBookIds);
  }, [readBookIds]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId, localStorageId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {

      const removeBook = await removeSavedBook({
        variables: { bookId, listName: 'saved' }
      });

      // When we remove the book we receive an update of the user
      // with the book removed. In order for that change to be reflected
      // on the screen, we have to call setUserData with the updated "user" object
      setUserData(removeBook.data.removeBook);

      if (error) {
        throw new Error('Something went wrong!');
      }

      // upon success, remove book's id from localStorage
      removeBookId(localStorageId, { name: 'saved_books_list' });

    } catch (err) {
      console.error(err);
    }
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

      if (err) {
        throw new Error('Something went wrong!');
      }

      setReadBookIds([...readBookIds, bookId]);

    } catch (err) {
      console.error(err);
    }

    handleDeleteBook(_id, bookId);
  }

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

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
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
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book._id, book.bookId)}>
                    Remove Book From List!
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

export default SavedBooks;
