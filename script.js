const libraryStorage = document.querySelector(".library_storage");

console.log(libraryStorage);

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

function displayBooksInLibrary(library) {
  console.log(library);
  for (let i = 0; i < library.length; i++) {
    const book = library[i];
    libraryStorage.insertAdjacentHTML(
      "beforeend",
      `
      <div class="book_container">
            <div class="book">
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
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);

  myLibrary.push(newBook);
}

addBookToLibrary("Hobbit", "J.K Rolings", 265, false);
addBookToLibrary("Hobbit", "J.K Rolings", 265, false);

displayBooksInLibrary(myLibrary);
