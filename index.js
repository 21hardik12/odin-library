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
    library.push(new Book(highestBookId++, title, author, pages, read));    
}