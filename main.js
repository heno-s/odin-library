const myLibrary = [];

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

addBookToLibrary("Harry Potter", "J. K. Rowling", "35", true);

function loadBooks() {
    myLibrary.forEach(displayBook);

    function displayBook(book) {
        const bookTemplate = document.querySelector("#book_template");
        const { title, author, pages, didRead } = book;
        const bookHtml =
            bookTemplate.content.firstElementChild.cloneNode(true);
        bookHtml.querySelector(".book-title").textContent = title;
        bookHtml.querySelector(".book-author").textContent = author;
        bookHtml.querySelector("#pages").textContent = pages;
        if (didRead) bookHtml.classList.add("read");

        const booksContainer = document.querySelector(".books");
        booksContainer.appendChild(bookHtml);
    }
}

loadBooks();
