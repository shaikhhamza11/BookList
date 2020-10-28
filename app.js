//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI() { }
UI.prototype.addBookToList = function (book) {
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
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }

}
UI.prototype.clearInputFields = function (book) {
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#isbn').value = "";
}



UI.prototype.showAlert = function (msg, className) {
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
    //add alert
    if (e.target.className === 'delete') {
        ui.showAlert('Book Removed', 'success')
    }
});
