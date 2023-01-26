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
