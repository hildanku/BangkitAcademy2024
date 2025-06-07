// Do your work here...
console.log('Hello, world!')

const STORAGE_KEY = 'LIBRARY'
let libraries = []


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookForm');
    const searchForm = document.getElementById('searchBook');

    form.addEventListener('submit', onFormSubmit);
    searchForm.addEventListener('submit', onSearchSubmit);

    loadFromStorage();
});


function onFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = parseInt(document.getElementById('bookFormYear').value);
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    const id = +new Date();

    books.push({ id, title, author, year, isComplete });
    storeToStorage();
    renderBooks();
    document.getElementById('bookForm').reset();
}

function onSearchSubmit(e) {
    e.preventDefault();
    const query = document.getElementById('searchBookTitle').value.toLowerCase();
    renderBooks(query);
}

function storeToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    books = stored ? JSON.parse(stored) : [];
    renderBooks();
}

function renderBooks(query = '') {
    const incomplete = document.getElementById('incompleteBookList');
    const complete = document.getElementById('completeBookList');

    incomplete.innerHTML = '';
    complete.innerHTML = '';

    books
        .filter(book => book.title.toLowerCase().includes(query))
        .forEach(book => {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                complete.appendChild(bookElement);
            } else {
                incomplete.appendChild(bookElement);
            }
        });
}

function createBookElement(book) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-bookid', book.id);
    wrapper.setAttribute('data-testid', 'bookItem');

    wrapper.innerHTML = `
    <h3 data-testid="bookItemTitle">${book.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
    <p data-testid="bookItemYear">Tahun: ${book.year}</p>
    <div>
      <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
      <button data-testid="bookItemDeleteButton">Hapus Buku</button>
      <button data-testid="bookItemEditButton">Edit Buku</button>
    </div>
  `;

    const toggleButton = wrapper.querySelector('[data-testid="bookItemIsCompleteButton"]');
    const deleteButton = wrapper.querySelector('[data-testid="bookItemDeleteButton"]');

    toggleButton.addEventListener('click', () => {
        book.isComplete = !book.isComplete;
        storeToStorage();
        renderBooks();
    });

    deleteButton.addEventListener('click', () => {
        books = books.filter(b => b.id !== book.id);
        storeToStorage();
        renderBooks();
    });

    return wrapper;
}
