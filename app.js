class Book {
  constructor(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
  }

  static addBookToDOM() {
    let output = ``;
    for (let i = 0; i < myLibrary.length; i++) {
      output += `<tr>
    <td>${myLibrary[i].title}</td>
    <td>${myLibrary[i].author}</td>
    <td><button class='status' data-number='${i}'>${myLibrary[i].status}</button></td>
    <td><button class='button-primary delete' data-number='${i}'>Delete</button></td>
    </tr>`;
    }
    return output;
  }

  static addBookToMyLibrary(e) {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const status = document.querySelector("#status");
    myLibrary.push(new Book(title.value, author.value, status.value));
    bookTable.innerHTML = Book.addBookToDOM();
    // e.preventDefault();
  }

  static deleteBook(e) {
    const arrayIndex = e.target.dataset.number;
    if (e.target.classList.contains("delete")) {
      e.target.parentNode.parentNode.remove();
      const index = myLibrary.indexOf(myLibrary[arrayIndex]);
      if (index > -1) {
        myLibrary.splice(index, 1);
      }
    }
    e.preventDefault();
  }

  static changeStatus(e) {
    const arrayIndex = e.target.dataset.number;

    if (e.target.classList.contains("status")) {
      if (e.target.innerText === "NOT READ") {
        e.target.innerText = "Read";
        myLibrary[arrayIndex].status = "Read";
      } else {
        e.target.innerText = "Not Read";
        myLibrary[arrayIndex].status = "Not Read";
      }
    }
    e.preventDefault();
  }

  static validityCheck(state, message) {
    if (state.validity.valueMissing) {
      state.setCustomValidity(message);
      state.reportValidity();
    } else {
      state.setCustomValidity("");
    }
  }
}

let myLibrary = [];

const bookTable = document.querySelector(".book-info");
const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");

bookTable.addEventListener("click", Book.changeStatus);
bookTable.addEventListener("click", Book.deleteBook);

bookForm.addEventListener("submit", (e) => {
  if (!titleInput.validity.valid) {
    Book.validityCheck(titleInput, "Please enter a Title name");
  } else if (!authorInput.validity.valid) {
    Book.validityCheck(authorInput, "Please enter an Author name");
  } else {
    Book.addBookToMyLibrary();
  } 
  e.preventDefault();
});

titleInput.addEventListener("input", (e) => {
  Book.validityCheck(titleInput, "Please enter a Title name");
});

authorInput.addEventListener("input", (e) => {
  Book.validityCheck(authorInput, "Please enter an Author name");
});
