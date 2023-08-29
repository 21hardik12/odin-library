const addBookBtn = document.querySelector('#show-modal');
const addBookModal = document.querySelector('#add-book-dialog');


addBookBtn.addEventListener('click', e => {
    addBookModal.showModal();
    addBookBtn.classList.add('vanish');
});