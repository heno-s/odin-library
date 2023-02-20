const myLibrary = [];
const form = document.forms[0];
const booksContainer = document.querySelector(".books");
const search = document.querySelector("#search");

search.addEventListener("input", filterBooks);
form.addEventListener("submit", addBook);
booksContainer.addEventListener("click", changeReadStatus);
booksContainer.addEventListener("click", deleteBook);

class Book {
    constructor(title, author, pages, didRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.didRead = didRead;
    }

    info() {
        return `${this.title} by ${this.author}, ${
            this.pages
        } pages, ${this.didRead ? "read" : "not read yet"}`;
    }
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
    const form = evt.target;
    const isValidForm = form.checkValidity();

    const title = form.title;
    const author = form.author;
    const pages = form.pages;
    const didRead = form.didRead;

    if (!isValidForm) {
        if (title.validity.valueMissing) {
            const spanError = title.nextElementSibling;
            spanError.classList.add("error");
            spanError.textContent = `Title value cannot be empty`;
        } else if (title.validity.valid) {
            const spanError = title.nextElementSibling;
            spanError.classList.remove("error");
            spanError.textContent = ``;
        }
        if (author.validity.valueMissing) {
            const spanError = author.nextElementSibling;
            spanError.classList.add("error");
            spanError.textContent = `You need to provide an author`;
        } else if (author.validity.valid) {
            const spanError = author.nextElementSibling;
            spanError.classList.remove("error");
            spanError.textContent = ``;
        }
        if (pages.validity.valueMissing) {
            const spanError = pages.nextElementSibling;
            spanError.classList.add("error");
            spanError.textContent = `Fill out number of pages`;
        } else if (pages.validity.patternMismatch) {
            const spanError = pages.nextElementSibling;
            spanError.classList.add("error");
            spanError.textContent = `It needs to be number`;
        } else if (pages.validity.valid) {
            const spanError = pages.nextElementSibling;
            spanError.classList.remove("error");
            spanError.textContent = ``;
        }
        return;
    }

    addBookToLibrary(
        title.value,
        author.value,
        pages.value,
        didRead.checked
    );
    loadBooks();
    form.reset();

    const errors = form.querySelectorAll(
        ".form-control input + span"
    );
    errors.forEach((error) => {
        error.classList.remove("error");
        error.textContent = "";
    });
}

addBookToLibrary("Harry Potter", "J. K. Rowling", "1", true);
addBookToLibrary("Harry Potter", "J. K. Rowling", "2", true);
addBookToLibrary("Harry Potter", "J. K. Rowling", "3", true);

loadBooks();
