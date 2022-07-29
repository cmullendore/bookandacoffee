import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_READ_BOOK } from '../utils/mutations';


const ReadBooks = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const [removeReadBook, { error }] = useMutation(REMOVE_READ_BOOK);

  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeReadBook({
        variables: { bookId }
      });

      if (error) {
        throw new Error('Something went wrong!');
      }

      // upon success, remove book's id from localStorage
      removeBookId(bookId, { name: 'read_books_list' });
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing Read Books!</h1>
        </Container>
      </Jumbotron>
      <div className='container'>
        <h5 className='text-center'>
          {userData.savedBooks.length
            ? `You have read ${userData.readBooks.length} ${userData.readBooks.length === 1 ? 'book' : 'books'}:`
            : "You haven't read any book yet!"}
        </h5>
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
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
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