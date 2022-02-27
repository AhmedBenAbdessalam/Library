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
  const read = document.querySelector("#read").checked;
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  //reset form
  document.querySelector(".side-content>form").reset();
  displayBooks(myLibrary);
}
//add all books in myLibrary to the main grid
function displayBooks(myLibrary) {
  resetGrid();
  const mainDiv = document.querySelector("main");
  for (let i = 0; i < myLibrary.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");

    let form = document.createElement("form");
    let ul = document.createElement("ul");

    for (let key in myLibrary[i]) {
      if (myLibrary[i].hasOwnProperty(key)) {
        let li = document.createElement("li");
        let input = document.createElement("input");
        input.id = `${key}-${i}`;
        if (key === "title") input.value = myLibrary[i][key];
        else if (key === "author") input.value = "by " + myLibrary[i][key];
        else if (key === "pages") input.value = myLibrary[i][key] + " pages.";
        else {
          input.type = "checkbox";
          input.checked = myLibrary[i][key];
          input.disabled = true;
        }
        input.readOnly = true;
        li.appendChild(input);
        ul.appendChild(li);
      }
    }

    //add toggle read button
    let toggleReadBt = document.createElement("button");
    toggleReadBt.id = `toggleRead-${i}`;
    if (myLibrary[i].read) toggleReadBt.textContent = "mark book as unread";
    else toggleReadBt.textContent = "mark book as read";
    toggleReadBt.addEventListener("click", (e) => {
      e.preventDefault();
      myLibrary[i].toggleRead();

      //update the card
      document.querySelector(`#read-${i}`).checked = myLibrary[i].read;
      if (myLibrary[i].read) toggleReadBt.textContent = "mark book as unread";
      else toggleReadBt.textContent = "mark book as read";
    });

    let liToggleBt = document.createElement("li");
    liToggleBt.appendChild(toggleReadBt);
    ul.appendChild(liToggleBt);

    //add remove book button
    let removeBt = document.createElement("button");
    removeBt.id = `remove-${i}`;
    removeBt.textContent = "Remove Book";
    removeBt.addEventListener("click", (e) => {
      e.preventDefault();
      const newLibrary = removeBook(i);
      displayBooks(newLibrary);
    });
    let liRemoveBt = document.createElement("li");
    liRemoveBt.appendChild(removeBt);
    ul.appendChild(liRemoveBt);

    form.appendChild(ul);
    card.appendChild(form);
    mainDiv.appendChild(card);
  }
}
function resetGrid() {
  const mainDiv = document.querySelector("main");
  mainDiv.textContent = "";
}
function removeBook(bookId) {
  myLibrary.splice(bookId, 1);
  return myLibrary;
}
// get dom elements

const addBookBt = document.querySelector("#add-book");
addBookBt.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});
