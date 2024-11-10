const myLibrary = [];
const fetchedBooks = [];

const container = document.querySelector(".container");
const popular = document.querySelector(".popular");
let fetchValue = false;

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  addToLocalStorage(book);
}

function displayBooks() {
  container.innerHTML = "";
  let bookList = document.querySelector(".book-list");
  bookList.innerHTML = "";

  myLibrary.forEach((book) => {
    let bookDiv = document.createElement("div");
    bookDiv.className = "book";

    let title = document.createElement("p");
    title.className = "book-title";
    title.innerHTML = `<span class="label">Title:</span> ${book.title}`;

    let author = document.createElement("p");
    author.className = "book-author";
    author.innerHTML = `<span class="label">Author:</span> ${book.author}`;

    let pages = document.createElement("p");
    pages.className = "book-pages";
    pages.innerHTML = `<span class="label">Pages:</span> ${book.pages}`;

    let read = document.createElement("p");
    read.className = "book-read";
    read.innerHTML = `<span class="label">Read:</span> ${
      book.read ? "Yes" : "No"
    }`;

    let del = document.createElement("span");
    del.className = "material-symbols-outlined";
    del.textContent = "delete";

    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(read);
    bookDiv.appendChild(del);

    container.appendChild(bookDiv);
  });

  if (fetchValue) {
    fetchedBooks.forEach((work, index) => {
      let li = document.createElement("li");
      li.innerHTML = `${index + 1}. <span class="label">Title:</span> ${
        work.title
      } by ${work.authors[0].name}`;
      bookList.appendChild(li);
    });
  }
}

function deleteBook() {
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("material-symbols-outlined")) {
      const index = Array.from(container.children).indexOf(
        e.target.parentElement
      );
      const element = myLibrary[index];

      const localStorageItem = localStorage.getItem(element.title);
      if (localStorageItem) {
        console.log(`Deleting ${element.title} from localStorage`);
        localStorage.removeItem(element.title);
      } else {
        console.log(
          `Title ${JSON.parse(element.title)} not found in localStorage`
        );
      }
      myLibrary.splice(index, 1);

      console.log(`Deleted ${element.title} from internal array`);
      console.log(myLibrary);
      displayBooks();
    }
  });
}

function updateToRead() {
  container.addEventListener("click", (e) => {
    const index = Array.from(container.children).indexOf(
      e.target.parentElement
    );

    if (myLibrary[index].read === false) {
      myLibrary[index].read = true;
    } else {
      myLibrary[index].read = false;
    }
    localStorage.clear();
    myLibrary.forEach((book) => {
      localStorage.setItem(book.title, JSON.stringify(book));
    });
    displayBooks();
  });
}

function addBook() {
  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    let read = formData.get("read") ? true : false;

    if (!title) {
      alert("Please enter a title.");
      return;
    }

    const isDuplicate = myLibrary.some(
      (book) => book.title === title && book.author === author
    );

    if (isDuplicate) {
      alert("Can't add the same book twice");
      return;
    }

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayBooks();
  });
}

async function fetchData() {
  try {
    const res = await fetch(
      "https://openlibrary.org/subjects/popular.json?limit=5"
    );
    const data = await res.json();
    data.works.forEach((work) => {
      const newBook = new Book(work.title, work.authors[0].name, "N/A", false);
      fetchedBooks.push(work);
      fetchValue = true;
    });
    displayBooks();
  } catch (err) {
    console.log(err);
  }
}

function addToLocalStorage(book) {
  localStorage.setItem(book.title, JSON.stringify(book));
}

function addYear() {
  const year = document.querySelector(".year");
  const date = new Date();
  const currYear = date.getFullYear();
  year.textContent = `${currYear} `;
}
// const book1 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
// const book2 = new Book("1984", "George Orwell", 328, false);
// const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
// const book4 = new Book("Pride and Prejudice", "Jane Austen", 279, false);

// addBookToLibrary(book1);
// addBookToLibrary(book2);
// addBookToLibrary(book3);
// addBookToLibrary(book4);

displayBooks();
deleteBook();
addBook();
fetchData();
updateToRead();
addYear();
