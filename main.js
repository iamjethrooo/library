let myLibrary = [];
myLibrary[0] = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages`;
};

function updateLibrary() {
  tbody.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const row = document.createElement("tr");
    const title = document.createElement("td");
    title.innerText = myLibrary[i].title;

    const author = document.createElement("td");
    author.innerText = myLibrary[i].author;

    const pages = document.createElement("td");
    pages.innerText = myLibrary[i].pages;

    const status = document.createElement("td");
    const statusInput = document.createElement("input");
    statusInput.type = "checkbox";
    statusInput.checked = myLibrary[i].status;
    status.appendChild(statusInput);

    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    row.appendChild(status);
    tbody.appendChild(row);
  }
}

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#read-status");

function addBookToLibrary() {
  myLibrary[myLibrary.length] = new Book(
    title.value,
    author.value,
    pages.value,
    readStatus.checked
  );
  console.log(readStatus.value);
  updateLibrary();
}

const tbody = document.querySelector("#books");

const addButton = document.querySelector("#add");
addButton.addEventListener("click", () => {
  modal.style.display = "flex";
});
const modal = document.querySelector("#modal-container");
const addBookButton = document.querySelector("#add-book");
addBookButton.addEventListener("click", () => {
  addBookToLibrary();
});
window.addEventListener("click", (e) => {
  if (e.target == modal) modal.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  updateLibrary();
});
