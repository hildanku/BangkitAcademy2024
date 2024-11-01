const { nanoid } = require('nanoid');
const books = [];

const addBooksHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
try {
  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt, finished
  };

  books.push(newBook);
} catch (error) {
console.log(error);
console.log("error bang")
}


  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id
    }
  }).code(201);

}

const getBooksHandler = (request, h) => {

  const { name, reading, finished } = request.query;

  let filteredBooks = [...books];

  if (name) {
    const query = name.toLowerCase();
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(query));
  }

  filteredBooks = filteredBooks
  .filter((book) => (reading === '0' || reading === '1' ? book.reading === (reading === '1') : true))
  .filter((book) => (finished === '0' || finished === '1' ? book.finished === (finished === '1') : true));

  try {
    return h.response({
      status: 'success',
      data: {
        books: filteredBooks.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      }
    }).code(200);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addBooksHandler, getBooksHandler
}
