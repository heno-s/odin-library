const myLibrary = [];
const form = document.forms[0];
const booksContainer = document.querySelector(".books");
const search = document.querySelector("#search");

search.addEventListener("input", filterBooks);
form.addEventListener("submit", addBook);
booksContainer.addEventListener("click", changeReadStatus);
booksContainer.addEventListener("click", deleteBook);

function Book(title, author, pages, didRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.didRead = didRead;
    this.info = function () {
        return `${this.title} by ${this.author}, ${
            this.pages
        } pages, ${this.didRead ? "read" : "not read yet"}`;
    };
}

function addBookToLibrary(title, author, pages, didRead) {
    const book = new Book(title, author, pages, didRead);
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

function loadBooks() {
    clearBooks();
    myLibrary.forEach(displayBook);

    function displayBook(book, index) {
        const bookTemplate = document.querySelector("#book_template");
        const { title, author, pages, didRead } = book;
        const bookHtml =
            bookTemplate.content.firstElementChild.cloneNode(true);
        bookHtml.dataset.index = index;
        bookHtml.querySelector(".book-title").textContent = title;
        bookHtml.querySelector(".book-author").textContent = author;
        bookHtml.querySelector("#pages").textContent = pages;
        if (didRead) bookHtml.classList.add("read");

        booksContainer.appendChild(bookHtml);
    }
    function clearBooks() {
        booksContainer.innerHTML = "";
    }
}

/* Event listeners */

function filterBooks(evt) {
    const search = evt.target;
    if (search.value === "") {
        [...booksContainer.children].forEach((book) => {
            book.style.display = "flex";
        });
        return null;
    }
    const toRemove = myLibrary
        .filter(
            (book) =>
                !book.title
                    .toLowerCase()
                    .startsWith(search.value.toLowerCase())
        )
        .map((book, index) => index);

    const books = [...booksContainer.children];
    books.forEach((book) => {
        if (toRemove.includes(+book.dataset.index)) {
            book.style.display = "none";
        } else {
            book.style.display = "flex";
        }
    });
}

function deleteBook(evt) {
    const t = evt.target;
    if (t.classList.contains("delete")) {
        const book = t.closest(".book");
        removeBookFromLibrary(+book.dataset.index);
        loadBooks();
    }
}

function changeReadStatus(evt) {
    const t = evt.target;
    if (t.classList.contains("read-status")) {
        const book = t.closest(".book");
        const bookInLibrary = myLibrary[+book.dataset.index];
        bookInLibrary.didRead = !bookInLibrary.didRead;
        if (bookInLibrary.didRead) {
            book.classList.add("read");
        } else {
            book.classList.remove("read");
        }
    }
}

function addBook(evt) {
    evt.preventDefault();
    const title = evt.target.title.value;
    const author = evt.target.author.value;
    const pages = evt.target.pages.value;
    const didRead = evt.target.didRead.checked;

    addBookToLibrary(title, author, pages, didRead);
    loadBooks();
    evt.target.reset();
}

addBookToLibrary("Harry Potter", "J. K. Rowling", "1", true);
addBookToLibrary("Harry Potter", "J. K. Rowling", "2", true);
addBookToLibrary("Harry Potter", "J. K. Rowling", "3", true);

loadBooks();
