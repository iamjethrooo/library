let myLibrary = [];

function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable("localStorage")) {
  if (!localStorage.getItem("myLibrary")) {
    // Populate storage
    myLibrary[0] = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
    myLibrary[1] = new Book("To Kill A Mockingbird", "Harper Lee", 281, true);
    myLibrary[2] = new Book(
      "The Great Gatsby",
      "F. Scott Fitzgerald",
      218,
      true
    );
    myLibrary[3] = new Book(
      "The Catcher in the Rye",
      "J.D.. Salinger",
      277,
      false
    );
    myLibrary[4] = new Book(
      "This Side of Paradise",
      "F. Scott Fitzgerald",
      305,
      true
    );
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  } else {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  }
} else {
  // Too bad, no local storage for us
}

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages`;
};

function updateTable() {
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
    statusInput.classList.add("checkbox");
    statusInput.type = "checkbox";
    statusInput.checked = myLibrary[i].status;
    statusInput.addEventListener("click", () => {
      let row = statusInput.parentNode.parentNode;
      myLibrary[row.rowIndex - 1].status = statusInput.checked;
      updateLibrary();
    });

    status.appendChild(statusInput);

    const del = document.createElement("td");
    const cross = document.createElement("i");
    cross.classList.add("fas");
    cross.classList.add("fa-times");
    cross.addEventListener("click", (e) => {
      let row = e.target.parentNode.parentNode;
      console.log(row.rowIndex);
      myLibrary.splice(row.rowIndex - 1, 1);
      updateLibrary();
      row.parentNode.removeChild(row);
    });
    cross.classList.add("cross");
    del.appendChild(cross);

    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    row.appendChild(status);
    row.appendChild(del);
    tbody.appendChild(row);
  }
}

function updateLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
const tbody = document.querySelector("#books");

const filterButtons = document.querySelectorAll(".filter");
filterButtons.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove("active");
    });
    filterButton.classList.toggle("active");
    let filter = filterButton.getAttribute("data-filter");
    let checkbox = document.querySelectorAll(".checkbox");

    if (filter == "all-books") {
      checkbox.forEach((checkbox) => {
        let row = checkbox.parentNode.parentNode;
        row.style.display = "table-row";
      });
      return;
    }
    checkbox.forEach((checkbox) => {
      let row = checkbox.parentNode.parentNode;
      if (filter == "read") {
        if (checkbox.checked) {
          row.style.display = "table-row";
        } else {
          row.style.display = "none";
        }
        return;
      } else if (filter == "not-read") {
        if (checkbox.checked) {
          row.style.display = "none";
        } else {
          row.style.display = "table-row";
        }
        return;
      }
    });
  });
});

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
  updateTable();
  updateLibrary();
}

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
  updateTable();
});
