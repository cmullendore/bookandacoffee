import React, { useState, useEffect } from 'react';
import { Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks = () => {
  // create function for saving a book to user's book list in database
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

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

      console.log(items);

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
  const handleSaveBook = async (bookId, type) => {

    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveBook({
        variables: { input: { ...bookToSave } }
      });

      if (error) {
        throw new Error('Something went wrong!');
      }

      switch (type.name) {
        case 'save_books': 
          setSavedBookIds([...savedBookIds, bookToSave.bookId]);
          break;
        case 'read_books':
          setReadBookIds([...readBookIds, bookToSave.bookId]);
          break;
      }
    } catch (err) {
      console.error(err);
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
                  <Card.Text>{book.description}</Card.Text>
                  {true && (
                    <div>
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId, { name: 'save_books' })}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book is already in your Saved Books List!'
                          : 'Save to Read!'}
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

export default SearchBooks;
