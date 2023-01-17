let books = [];

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
    console.log('Is read',this.isRead);
}
function addToLibrary(book){
    books.push(book);
}
const book1 = new Book('La Odisea','Homero',43,true);
addToLibrary(book1);
book1.printInfo();
