const { nanoid } = require('nanoid');
const books = require('./books');

const createTimestamp = () => new Date().toISOString();

const addBooksHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = createTimestamp();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  if(!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400);
  }

  if(readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt, finished
  };

  books.push(newBook);

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

  let filtered = books;

  if (name) {
    filtered = filtered.filter((b) =>
      b.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading === '0' || reading === '1') {
    filtered = filtered.filter((b) => b.reading === (reading === '1'));
  }

  if (finished === '0' || finished === '1') {
    filtered = filtered.filter((b) => b.finished === (finished === '1'));
  }

  return h.response({
    status: 'success',
    data: {
      books: filtered.map(({ id, name, publisher }) => ({ id, name, publisher })),
    },
  }).code(200);
};

const getBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;


    const book = books.find((n) => n.id === bookId);
    if (book) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    // console.log(error);
    return response;
}

const updateBooksHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        })
        .code(404);
    } else {
      books[bookIndex] = {
        ...books[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt: new Date().toISOString(),
      };
      return h
        .response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        })
        .code(200);
    }

}

const deleteBooksHandler = (request, h) => {
  const { bookId } = request.params;
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);
  }

  books.splice(bookIndex, 1);

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    .code(200);
}
  

module.exports = {
  addBooksHandler,
  getBooksHandler,
  getBooksByIdHandler,
  updateBooksHandler,
  deleteBooksHandler,
};