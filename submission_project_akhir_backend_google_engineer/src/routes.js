const {
  addBooksHandler,
  getBooksHandler,
  getBooksByIdHandler,
  updateBooksHandler,
} = require('./handler');


const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBooksHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: (request, h) => {

    }
  }
];

module.exports = routes;
