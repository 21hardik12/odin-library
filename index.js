function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
}
const library = [];
let highestBookId = 0;

const addBookBtn = document.querySelector('#show-modal');
const addBookModal = document.querySelector('#add-book-dialog');
const modalForm = document.querySelector('#modal-form');
const submitBookBtn = modalForm.querySelector('#submit-book-button');
const bookGrid = document.querySelector('.books-grid');

addBookBtn.addEventListener('click', e => {
    addBookModal.showModal();
    addBookBtn.classList.add('vanish');
});

function raiseError(element, message) {
    const errorBox = element.nextElementSibling;
    errorBox.textContent = message;
    errorBox.classList.add('error');
}

function raiseSuccess(element) {
    const errorBox = element.nextElementSibling;
    errorBox.textContent = '';
    errorBox.classList.remove('error');
}

addBookModal.addEventListener('close', e => {      
    addBookBtn.classList.remove('vanish');    
});

submitBookBtn.addEventListener('click', e => {
    e.preventDefault();
    const title = modalForm.querySelector('#title');
    const author = modalForm.querySelector('#author');
    const pages = modalForm.querySelector('#pages');
    const readornot = modalForm.querySelector('#readornot');
    
    if (title.value.trim() === '') {
        raiseError(title, 'Title is required!');
    } else if (library.some(obj => (obj.title===title.value.trim() && obj.author === author.value.trim()))) {
        raiseError(title, 'Book already added!');
    } else {
        raiseSuccess(title);
    }
    
    if (author.value.trim() === '') {
        raiseError(author, 'Author is required!');
    } else {
        raiseSuccess(author);
    }

    if (pages.value.trim() === '') {
        raiseError(pages, 'Pages is required!');
    } else if (pages.value.trim() <= 0) {
        raiseError(pages, 'Enter a valid number of pages!');
    } else {
        raiseSuccess(pages);
    }

    if (!modalForm.querySelector('.error')) {
        addBookToLibrary(title.value.trim(), author.value.trim(), pages.value.trim(), readornot.checked);        
        addBookModal.close();
        modalForm.reset();
    }    
});

// Library logic
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(highestBookId++, title, author, pages, read);
    library.push(book);
    displayBook(book);    
}

function removeBookFromLibrary(element) {
    const bookToRemove = library.findIndex(book => book.id === element.book.id);
    library.splice(bookToRemove, 1);
    bookGrid.removeChild(element);
}

function displayBook(book) {
    const cardElement = document.createElement('div');
    const titleElement = document.createElement('div');
    const authorElement = document.createElement('div');
    const pagesElement = document.createElement('div');
    const readornotButton = document.createElement('button');
    const removeButton = document.createElement('button');

    cardElement.book = book;

    titleElement.textContent = `"${book.title}"`;
    authorElement.textContent = `By ${book.author}`;
    pagesElement.textContent = `${book.pages} pages`;    
    readornotButton.classList.add('readornotBtn');
    readornotButton.textContent = book.read ? 'Read' : 'Not read';
    if (book.read) readornotButton.classList.add('read');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('removeBtn');

    removeButton.addEventListener('click', function () {
        removeBookFromLibrary(this.parentElement);
    });
    
    cardElement.appendChild(titleElement);
    cardElement.appendChild(authorElement);
    cardElement.appendChild(pagesElement);
    cardElement.appendChild(readornotButton);
    cardElement.appendChild(removeButton);
    
    cardElement.classList.add('book-card');
    
    readornotButton.addEventListener('click', e => {
        console.log(cardElement.book);
        readornotButton.classList.toggle('read');
        if (readornotButton.classList.contains('read')) {
             readornotButton.textContent = 'Read';
             cardElement.book.read = true;
        } else {
            readornotButton.textContent = 'Not read'
            cardElement.book.read = false;
        };
        
        console.log(cardElement.book);
    });
    bookGrid.appendChild(cardElement);
}

