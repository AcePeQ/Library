const libraryStorage = document.querySelector(".library_storage");
const modalWrapper = document.querySelector(".modal_wrapper");
const modalOverlay = document.querySelector(".modal_overlay");
const closeModalBtn = document.querySelector("#button-closeBook");
const addBookBtn = document.querySelector(".button-add");
const form = document.querySelector("#book-form");

let deleteButtons;
let statusButtons;

const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = function () {
    return `${this.title} by ${this.author}, ${pages}, ${
      this.isRead ? "already read" : "not read yet"
    }`;
  };
}

function handleOpenModal() {
  modalWrapper.classList.add("active");
}

function handleCloseModal() {
  modalWrapper.classList.remove("active");
}

addBookBtn.addEventListener("click", handleOpenModal);
modalOverlay.addEventListener("click", handleCloseModal);
closeModalBtn.addEventListener("click", handleCloseModal);

function handleDelete(e) {
  const parentNode = e.target.parentNode.parentNode;
  const bookID = Number(parentNode.getAttribute("id"));

  myLibrary.splice(bookID, 1);
  displayBooksInLibrary(myLibrary);
}

function toggleStatus(e) {
  const parentNode = e.target.parentNode.parentNode;
  const bookID = Number(parentNode.getAttribute("id"));
  const book = myLibrary.find((_, index) => index === bookID);

  book.isRead = !book.isRead;
  displayBooksInLibrary(myLibrary);
}

function formNewBook() {
  const formData = new FormData(form);
  console.log(formData);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formNewBook();
});

function displayBooksInLibrary(library) {
  libraryStorage.innerHTML = "";

  for (let i = 0; i < library.length; i++) {
    const book = library[i];

    libraryStorage.insertAdjacentHTML(
      "beforeend",
      `
      <div class="book_container">
            <div class="book" id=${i}>
              <p class="book_name">${book.title}</p>
              <p class="book_author">${book.author}</p>
              <p class="book_pages">${book.pages} pages</p>
              <p class="book_isRead">
              ${
                book.isRead ? "You read this book" : "You didn't read this book"
              }
              </p>
              <div class="book_buttons">
                <button class="button_book button-status">Change status</button>
                <button class="button_book button-delete">Delete</button>
              </div>
            </div>
          </div>
      `
    );
  }

  deleteButtons = [...document.querySelectorAll(".button-delete")];
  statusButtons = [...document.querySelectorAll(".button-status")];

  deleteButtons.forEach((button) =>
    button.addEventListener("click", handleDelete)
  );

  statusButtons.forEach((button) =>
    button.addEventListener("click", toggleStatus)
  );
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);

  myLibrary.push(newBook);
}

addBookToLibrary("Hobbit", "J.K Rolings", 265, false);
addBookToLibrary("Hobbit", "J.K Roli", 265, false);
addBookToLibrary("Hobb", "J.K Roli", 265, false);
addBookToLibrary("Hoit", "J.K Roli", 265, false);
addBookToLibrary("Hbbit", "J.K Roli", 265, false);
displayBooksInLibrary(myLibrary);
