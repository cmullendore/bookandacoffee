export const getSavedBookIds = (type) => {

  const savedBookIds = localStorage.getItem('saved_books_list')
    ? JSON.parse(localStorage.getItem('saved_books_list'))
    : [];

  const readBookIds = localStorage.getItem('read_books_list')
    ? JSON.parse(localStorage.getItem('read_books_list'))
    : [];

  switch (type.name) {
    case 'saved_books_list':
      return savedBookIds;
    case 'read_books_list':
      return readBookIds;
    default:
      break;
  }
};

export const saveBookIds = (savedBookIdArr, readBookIdArr) => {

  if (savedBookIdArr.length) {
    localStorage.setItem('saved_books_list', JSON.stringify(savedBookIdArr));
  }

  if (readBookIdArr.length) {
    localStorage.setItem('read_books_list', JSON.stringify(readBookIdArr));
  }

};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};
