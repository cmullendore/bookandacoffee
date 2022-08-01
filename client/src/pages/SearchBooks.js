import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import {searchGoogleBooks} from '../utils/API'

import Auth from '../utils/auth';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

import { SAVE_BOOK } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

/* PREVIOUS SEARCH CODE - Modify and reuse to fit our site design

import { SAVE_BOOK } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';


=======
import { Button, Card, CardColumns } from 'react-bootstrap';
>>>>>>> main

import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK, READ_BOOK } from '../utils/mutations';

const SearchBooks = () => {
  // create function for saving a book to user's book list in database
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  const [readBook, { error: err }] = useMutation(READ_BOOK);

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const [searchedBookName, setSearchedBookName] = useState('');

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds({ name: 'saved_books_list' }));

  // create state to hold read bookId values
  const [readBookIds, setReadBookIds] = useState(getSavedBookIds({ name: 'read_books_list' }));

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  useEffect(() => {
    saveBookIds(savedBookIds, readBookIds);
  }, [savedBookIds, readBookIds]);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.previewLink
      }));

      setSearchedBooks(bookData);
      setSearchedBookName(searchInput);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };



  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId, list) => {

    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    switch (list.name) {
      case 'save_books':
        try {
          await saveBook({
            variables: { book: { ...bookToSave } }
          });

          if (error) {
            throw new Error('Something went wrong!');
          }

          setSavedBookIds([...savedBookIds, bookToSave.bookId]);

        } catch (err) {
          console.error(err);
        }
        break;
      case 'read_books':
        try {
          await readBook({
            variables: { book: { ...bookToSave } }
          });

          if (err) {
            throw new Error('Something went wrong!');
          }

          setReadBookIds([...readBookIds, bookToSave.bookId]);

        } catch (err) {
          console.error(err);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className='container'>
      <form className='search-books-form-div' onSubmit={handleFormSubmit}>
        <div className='row'>
          <div className='search-books-form col-12 col-md-10'>
            <label htmlFor='searchInput'>
              <i className='fa-solid fa-magnifying-glass fa-xl'></i>
            </label>
            <input
              id='searchInput'
              name='searchInput'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='text'
              placeholder='Search for a Book!'
            />
          </div>
          <div className='col-12 col-md-2'>
            <button className='search-form-btn' type='submit'>
              Search
            </button>
          </div>
        </div>
      </form>
      <section>
        <div>
          <h5>
            {searchedBooks.length
              ? `Found ${searchedBooks.length} results for ${searchedBookName}:`
              : 'Search for a book'}
          </h5>
        </div>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <a href={book.link} target='_blank' rel='noopener noreferrer'>Review on Google Books</a>
                  <p className='small'>Authors: {book.authors}</p>
                  <p>{book.description}</p>
                  {Auth.loggedIn() && (
                    <div>
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId, { name: 'save_books' })}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book is already in your Saved Books List!'
                          : 'Save!'}
                      </Button>
                      <Button
                        disabled={readBookIds?.some((readBookId) => readBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId, { name: 'read_books' })}>
                        {readBookIds?.some((readBookId) => readBookId === book.bookId)
                          ? 'This book is already in your Read Books List!'
                          : 'Already Read!'}
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </section>
    </div>
  );
};

<<<<<<< HEAD
*/

const SearchBooks = () => { 
  const [searchValue, setSearchValue] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [addBook] = useMutation(SAVE_BOOK);

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });
  
  // handleInputChange
  const handleInputChange = (event) => setSearchValue(event.target.value);
  //searchBooks2 - api call to fetch books
  const searchBooks2 = async() => {
    // api call to fetch books
    try {
      const response = await searchGoogleBooks(searchValue);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.infoLink
      }));

      setSearchedBooks(bookData);
      setSearchValue('');
    } catch (err) {
      console.error(err);
    }
  }

  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await addBook({
        variables: {...bookToSave }
      });

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing Search Books!</h1>

          <Form.Group>
            <Form.Label htmlFor="search">Search for a book</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter"
              name="search"
              onChange={handleInputChange}
              value={searchValue}
              
            />
          </Form.Group>
          <Button
            disabled={!searchValue}
            type="button"
            variant="success"
            onClick={searchBooks2}
          >
            Search
          </Button>
          
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};
=======
>>>>>>> main
export default SearchBooks;
