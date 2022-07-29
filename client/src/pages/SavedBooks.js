import React, { useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId, getSavedBookIds, saveBookIds } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_SAVED_BOOK } from '../utils/mutations';


const SavedBooks = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook, { error }] = useMutation(REMOVE_SAVED_BOOK);

  // const [readBook, { error : err }] = useMutation(READ_BOOK)

  const userData = data?.me || {};

  // create state to hold read bookId values
  // const [readBookIds, setReadBookIds] = useState(getSavedBookIds({ name: 'read_books_list' }));

  // useEffect(() => {
  //   saveBookIds([], readBookIds);
  // }, [readBookIds]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({
        variables: { bookId }
      });

      if (error) {
        throw new Error('Something went wrong!');
      }

      // upon success, remove book's id from localStorage
      removeBookId(bookId, { name: 'saved_books_list' });
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  function handleReadBook(book) {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    console.log(book);

    // try {
    //   await readBook({
    //     variables: { book: { ...book } }
    //   });

    //   if (err) {
    //     throw new Error('Something went wrong!');
    //   }

    //   setReadBookIds([...readBookIds, book.bookId]);

    // } catch (err) {
    //   console.error(err);
    // }

    handleDeleteBook(book.bookId);
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
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
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
