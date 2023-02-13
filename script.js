let books = [];
let start = true;
const main = document.querySelector('.main');
const addBookButton = document.querySelector('.add-button');
addBookButton.addEventListener('click',showWindowAddBook);

function Book(title,author,numeroPaginas,isRead){
    this.title = title;
    this.author = author;
    this.numeroPaginas = numeroPaginas;
    this.isRead = isRead;
    
}
Book.prototype.printInfo = function (){
    console.log('Title:',this.title);
    console.log('Author:',this.author);
    console.log('Number Pages:',this.numeroPaginas);
    console.log('Is read:',this.isRead);
}
function addToLibrary(book){
    books.push(book);
}

function createInput(type,id,name,inputClass = "",isRequaried=false){
    const aux = document.createElement('input');
    aux.type = type;
    aux.setAttribute('id',id);
    aux.setAttribute('name',name);
    if(inputClass != ""){
        aux.classList.add(inputClass);
    }
    aux.required = isRequaried;
    return aux;
}
function createLabel(textContent,forInput=""){
    const aux = document.createElement('label');
    aux.setAttribute('for',forInput);
    aux.textContent=textContent;
    return aux;
}
function createAddBookFormContainer(){
    const aux = document.createElement('div');
    aux.classList.add('form-container');
    return aux;
}

function createAddBookForm(){
    const isReadContainer = document.createElement('div');
    const form = document.createElement('form');
    form.classList.add('form');
    isReadContainer.classList.add('is-read-container');
    /*Elements*/
    /*Title Form*/
    const titleForm = document.createElement('p');
    titleForm.classList.add('title-form');
    titleForm.textContent='My Book';
    /*Inputs*/
    const titleInput = createInput('text','title','title','default-input',true);
    const authorInput = createInput('text','author','author','default-input');
    const numberPagesInput = createInput('number','number-pages','number-pages','default-input');
    const isReadYesInput = createInput('radio','yes-is-read','isRead');
    const isReadNoInput = createInput('radio','no-is-read','isRead');
    /*Other inputs attributes*/
    numberPagesInput.setAttribute('min','1');
    isReadYesInput.setAttribute('value','yes');
    isReadNoInput.setAttribute('value','no');
    isReadNoInput.checked = true;
    /*Labels*/
    const titleBookLabel = createLabel('Title:',titleInput.id);
    const authorBookLabel = createLabel('Author:',authorInput.id);
    const numberPagesBookLabel = createLabel('N° Pages:',numberPagesInput.id);
    const isReadContainerLabel =  createLabel('Is Read:');
    const yesIsReadLabel = createLabel('Yes',isReadYesInput.id);
    const noIsReadLabel = createLabel('No',isReadNoInput.id);
    /*Alerts*/
    const titleAlert = document.createElement('p');
    titleAlert.setAttribute('id','title-alert');
    titleAlert.textContent = 'Coloca el nombre del libro';
    titleAlert.classList.add('alert');
    const authorAlert = document.createElement('p');
    authorAlert.setAttribute('id','author-alert');
    authorAlert.textContent = 'Coloca el nomber del Autor';
    authorAlert.classList.add('alert');
    const numberPagesAlert = document.createElement('p');
    numberPagesAlert.setAttribute('id','number-pages-alert');
    numberPagesAlert.textContent = 'Coloca la cantidad de paginas';
    numberPagesAlert.classList.add('alert');
    /*Divs Containers*/
    const titleContainer = document.createElement('div');
    titleContainer.appendChild(titleBookLabel);
    titleContainer.appendChild(titleAlert);
    titleContainer.appendChild(titleInput);
    titleContainer.classList.add('input-container');
    const authorContainer = document.createElement('div');
    authorContainer.appendChild(authorBookLabel);
    authorContainer.appendChild(authorAlert);
    authorContainer.appendChild(authorInput);
    authorContainer.classList.add('input-container');
    const numberPagesContainer = document.createElement('div');
    numberPagesContainer.appendChild(numberPagesBookLabel);
    numberPagesContainer.appendChild(numberPagesAlert);
    numberPagesContainer.appendChild(numberPagesInput);
    numberPagesContainer.classList.add('input-container');
    /*Create Button*/
    const addBookFormButton = document.createElement('button');
    addBookFormButton.setAttribute('type','submit');
    addBookFormButton.classList.add('button-submit-form');
    addBookFormButton.textContent = 'Submit';
    addBookFormButton.addEventListener('click',(event)=>{
        event.preventDefault();
        if(validateAddBookForm()){
            createBook(titleInput.value,authorInput.value,numberPagesInput.value,isReadYesInput.checked);
            appendBook();
        }
    });
    const exitButton = document.createElement('button');
    exitButton.classList.add('exit-button');
    exitButton.textContent='X';
    exitButton.addEventListener('click',closeWindowAddBook);
    /*Organize*/
    isReadContainer.appendChild(isReadContainerLabel);
    isReadContainer.appendChild(yesIsReadLabel);
    isReadContainer.appendChild(isReadYesInput);
    isReadContainer.appendChild(noIsReadLabel);
    isReadContainer.appendChild(isReadNoInput);

    form.appendChild(titleForm);
    form.appendChild(titleContainer);
    form.appendChild(authorContainer);
    form.appendChild(numberPagesContainer);
    form.appendChild(isReadContainer);
    form.appendChild(addBookFormButton);
    form.appendChild(exitButton);

    return form;
}
function showWindowAddBook(){
    const addBookFormContainer = createAddBookFormContainer(); 
    const form = createAddBookForm();
    addBookFormContainer.appendChild(form);
    main.appendChild(addBookFormContainer);
}
function closeWindowAddBook(){
    const addBookFormContainer = document.querySelector('.form-container');
    main.removeChild(addBookFormContainer);
}
function createBook(title,author,numeroPaginas,isRead){
    let auxIsRead = '';
    if(isRead){auxIsRead='yes'}
    else{auxIsRead='no'}
    const book = new Book(title,author,numeroPaginas,auxIsRead);
    addToLibrary(book);
}
/*Validation*/
function activateAlert(id){
    const alert = document.getElementById(id);
    alert.classList.add('activate');
}
function titleBookValidation(){
    const titleBook = document.getElementById('title');
    if (titleBook.value == ''){
        activateAlert('title-alert');
        return false;
    }
    return true;
}
function authorBookValidation(){
    const authorBook = document.getElementById('author');
    if (authorBook.value == ''){
        activateAlert('author-alert');
        return false;
    }
    return false;
}
function numberPagesValidation(){
    const numberPages = document.getElementById('number-pages');
    if (numberPages.value > 1){
        return true;
    }
    activateAlert('number-pages-alert');
    return false;
}
function validateAddBookForm(){
    let validate = titleBookValidation();
    validate = authorBookValidation();
    validate = numberPagesValidation();
    return validate;
}
function createBookCard(title,author,numberPages,isRead){
    /*Containers*/
    const cardBookContainer = document.createElement('div');
    cardBookContainer.classList.add('card-book-container');
    const titleCardContentContainer = document.createElement('div');
    titleCardContentContainer.classList.add('card-content-container');
    const authorCardContentContainer = document.createElement('div');
    authorCardContentContainer.classList.add('card-content-container');
    const numberPagesContentContainer = document.createElement('div');
    numberPagesContentContainer.classList.add('card-content-container');
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('card-buttons-container');
    /*Paragraphs*/
    const titlePara = document.createElement('p');
    titlePara.textContent='Title';
    const authorPara = document.createElement('p');
    authorPara.textContent='Author';
    const numberPagesPara = document.createElement('p');
    numberPagesPara.textContent='N° Pages';
    /*Values*/
    const titleValue = document.createElement('span');
    titleValue.textContent = title;
    const authorValue = document.createElement('span');
    authorValue.textContent = author;
    const numberPagesValue = document.createElement('span');
    numberPagesValue.textContent=numberPages;
    /*Buttons*/
    const readButton = document.createElement('input');
    readButton.setAttribute('type','button');
    readButton.classList.add('is-read-card-button');
    readButton.value = 'Read';
    if (isRead == 'yes') readButton.style.backgroundColor = '#1AAE35';
    const removeButton = document.createElement('input');
    removeButton.setAttribute('type','button');
    removeButton.classList.add('remove-card-button');
    removeButton.value = 'Remove';
    /*Organize*/
    titleCardContentContainer.appendChild(titlePara);
    titleCardContentContainer.appendChild(titleValue);
    authorCardContentContainer.appendChild(authorPara);
    authorCardContentContainer.appendChild(authorValue);
    numberPagesContentContainer.appendChild(numberPagesPara);
    numberPagesContentContainer.appendChild(numberPagesValue);
    buttonsContainer.appendChild(readButton);
    buttonsContainer.appendChild(removeButton);
    
    cardBookContainer.appendChild(titleCardContentContainer);
    cardBookContainer.appendChild(authorCardContentContainer);
    cardBookContainer.appendChild(numberPagesContentContainer);
    cardBookContainer.appendChild(buttonsContainer);
    
    return cardBookContainer;
}
function addCardToMain(card){
    if (start){
        start = false;
        main.classList.remove('main-initial');
        main.classList.add('main-last');
        main.appendChild(card);
    }else{
        main.appendChild(card);
    }
}
function appendBook(){
    const book = books[books.length-1];
    const card = createBookCard(book.title,book.author,book.numeroPaginas,book.isRead);
    addCardToMain(card);
}
function printBooks(){
    books.forEach(book => {
        book.printInfo();
    });
}