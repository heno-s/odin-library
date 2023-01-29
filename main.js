const myLibrary = [];
const form = document.forms[0];
const booksContainer = document.querySelector(".books");

booksContainer.addEventListener("click", (e) => {
    const t = e.target;
    if (t.classList.contains("delete")) {
        const book = t.closest(".book");
        removeBookFromLibrary(book.dataset.index);
        loadBooks();
    } else if (t.classList.contains("read-status")) {
        const book = t.closest(".book");
        const bookInLibrary = myLibrary[book.dataset.index];
        bookInLibrary.didRead = !bookInLibrary.didRead;
        if (bookInLibrary.didRead) {
            book.classList.add("read");
        } else {
            book.classList.remove("read");
        }
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const pages = e.target.pages.value;
    const didRead = e.target.didRead.checked;

    addBookToLibrary(title, author, pages, didRead);
    loadBooks();
    e.target.reset();
});

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

addBookToLibrary("Harry Potter", "J. K. Rowling", "1", true);
addBookToLibrary("Harry Potter", "J. K. Rowling", "2", true);
addBookToLibrary("Harry Potter", "J. K. Rowling", "3", true);

loadBooks();
