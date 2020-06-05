let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages`;
};

function addBookToLibrary() {}

myLibrary[0] = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(myLibrary[0].info());

const tbody = document.querySelector("#books");

for (let i = 0; i < 1; i++) {
  const row = document.createElement("tr");
  const title = document.createElement("td");
  title.innerText = myLibrary[i].title;

  const author = document.createElement("td");
  author.innerText = myLibrary[i].author;

  const pages = document.createElement("td");
  pages.innerText = myLibrary[i].pages;

  const status = document.createElement("td");
  status.innerText = myLibrary[i].title ? "Not Read" : "Read";

  row.appendChild(title);
  row.appendChild(author);
  row.appendChild(pages);
  row.appendChild(status);
  tbody.appendChild(row);
}
