let myLibrary = [];
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};
//add a book to the list
function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").value === "on" ? true : false;
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  //reset form
  document.querySelector(".side-content>form").reset();
  displayBooks(myLibrary);
}
//add all books in myLibrary to the main grid
function displayBooks(myLibrary) {
  const mainDiv = document.querySelector("main");
  for (let i = 0; i < myLibrary.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<form><ul><li>
    <input id="title-${i}" value=${myLibrary[i].title} readonly/>
  </li>

  <li>
    <input id="author-${i}" value=${myLibrary[i].author} readonly/>
  </li>
  <li>
    <input type="number" id="pages-${i}" value="${myLibrary[i].pages}" readonly/>
  </li>
  <li>
    <input type="checkbox" id="read-${i}" readonly/>
  </li>
  <button id="remove-${i}" >Remove Book</button></ul></form>`;
    mainDiv.appendChild(card);
    //check if the book is read
    if (read) {
      console.log(`read-${i}`);
      document.querySelector(`#read-${i}`).checked = true;
    }
  }
}

// get dom elements

const addBookBt = document.querySelector("#add-book");
addBookBt.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});
