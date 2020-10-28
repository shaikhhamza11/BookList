class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        //create element
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='delete'>X</a></td>`;
        list.appendChild(row);
    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    showAlert(msg, className) {
        //create a div
        const div = document.createElement('div');
        //add class name
        div.className = `alert ${className}`;
        //add textnode
        div.appendChild(document.createTextNode(msg));
        //get elements to add div

        const container = document.querySelector('.container'),
            form = document.querySelector('#book-form');
        //insert before
        container.insertBefore(div, form);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000)
    }
    clearInputFields(book) {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }

}

//Local Storage

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function (book) {
            //instantiate ui
            const ui = new UI()
            ui.addBookToList(book);
        });


    }
    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBooks(isbn) {
        // console.log(isbn)
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books))
    }
}
document.addEventListener('DOMContentLoaded', Store.displayBooks)
document.getElementById('book-form').addEventListener('submit', function (e) {
    //get form values
    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
    //instatiate book
    const book = new Book(title, author, isbn);
    //instantiate ui
    const ui = new UI()

    //Validation
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please enter Book details properly', 'error')
    }
    else {
        //add book to list
        ui.addBookToList(book);
        //add to local storage
        Store.addBooks(book);
        ui.showAlert('Book Succesfully Added', 'success')
        // clear ui
        ui.clearInputFields(book);

    }



    e.preventDefault();
});
//DELETE TABLE ROW
document.querySelector('#book-list').addEventListener('click', function (e) {
    //instantiate ui
    const ui = new UI()
    ui.deleteBook(e.target);
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    //add alert
    if (e.target.className === 'delete') {
        ui.showAlert('Book Removed', 'success')
    }
});