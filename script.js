const myLibrary = [];

const container = document.querySelector(".container");

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  container.innerHTML = "";
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
    localStorage.setItem(book.title, JSON.stringify(book));
    container.appendChild(bookDiv);
  });
}

function deleteBook() {
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("material-symbols-outlined")) {
      const index = Array.from(container.children).indexOf(
        e.target.parentElement
      );

      const element = myLibrary[index];

      localStorage.removeItem(element.title);
      console.log(`Deleted ${element.title} from Local Storage`);

      myLibrary.splice(index, 1);
      console.log(`Deleted ${element.title} from internal array`);

      displayBooks();
    }
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
    const read = formData.get("read");

    console.log("Title:", title);
    console.log("Author:", author);
    console.log("Pages:", pages);
    console.log("Read:", read);
  });
}

const book1 = new Book("To Kill a Mockingbird", "Harper Lee", 281, "true");
const book2 = new Book("1984", "George Orwell", 328, "false");
const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, "true");
const book4 = new Book("Pride and Prejudice", "Jane Austen", 279, "false");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

displayBooks();
deleteBook();
addBook();
