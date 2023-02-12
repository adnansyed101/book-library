// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class
class UI {
  // Display books
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      UI.addBookToList(book);
    });
  }

  // Add a book
  static addBookToList(book) {
    const list = document.getElementById('book-list');

    // Create row
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>`;

    list.appendChild(row);
  }

  // show Alert
  static showAlert(message, className) {
    // create div
    const div = document.createElement('div');
    //div class
    div.className = `alert alert-${className}`;
    // dic text
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  // Clear field
  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  // Delete Book
  static deleteBook(target) {
    if (target.classList.contains('delete')) {
      if (confirm('Are you sure?')) {
        target.parentElement.parentElement.remove();
      }
    }
  }
}

// Store class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// add a book event
document.getElementById('book-form').addEventListener('submit', function (e) {
  // GET FROM UI
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please Fill In All Fields', 'danger');
  } else {
    const book = new Book(title, author, isbn);

    // Add Book To list
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // show Alert
    UI.showAlert('Book Added!', 'success');

    // Clear field
    UI.clearFields();
  }

  e.preventDefault();
});

// remove book
document.getElementById('book-list').addEventListener('click', function (e) {
  UI.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  UI.showAlert('Book Deleted', 'success');
});
