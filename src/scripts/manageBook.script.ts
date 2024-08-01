import { BookApi } from "../api/book.api";
import { book } from "../interfaces/book.interface";
import { manageDeleteAndEditEventListeners } from "../utils/adminEditAndDeleteEvents";
import { Toast } from "../utils/toast";
import { Pagination } from "./pagination.script";

export class manageBookActions {
  private static form: HTMLFormElement;
  private static searchInput: HTMLInputElement;
  private static searchBtn: HTMLButtonElement;
  private static bookTable: HTMLDivElement;

  private static pagination: Pagination;
  private static currentPage: number = 1;
  private static itemsPerPage: number = 15;
  private static totalItems: number | null = null;

  static init() {
    //Initialize elements
    this.form = document.getElementById("addBookForm") as HTMLFormElement;
    this.searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    this.searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
    this.bookTable = document.getElementById("bookTable") as HTMLDivElement;

    //Initialize pagination
    this.pagination = new Pagination("paginationContainer", (page) => {
      this.currentPage = page;
      this.handleSearch();
    });

    this.handleSearch(); // Perform the search for initial page load

    //event listeners
    this.searchBtn.addEventListener("click", (e) => {
      this.currentPage = 1;
      e.preventDefault();
      this.handleSearch();
    });
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.currentPage = 1;
        this.handleSearch();
      }
    });
    this.form.addEventListener("submit", this.handleFormSubmit);
    //to add event listeners to the action buttons before they render
    manageDeleteAndEditEventListeners(manageBookActions);
  }

  static async handleSearch() {
    const searchTerm = this.searchInput.value;
    try {
      const books = await BookApi.getBooks(
        this.currentPage,
        this.itemsPerPage,
        {
          title: searchTerm,
        }
      );
      //for setting total pages
      this.totalItems = books.meta.total;
      const totalPages = Math.ceil(this.totalItems! / this.itemsPerPage);

      this.renderBooks(books.data);
      this.pagination.update(this.currentPage, totalPages);
    } catch (error) {
      Toast.showToast(
        "An error occurred while fetching books. Please try again.",
        "error"
      );
    }
  }

  static renderBooks(books: book[]) {
    if (books.length === 0) {
      this.bookTable.innerHTML = '<p class="text-center">No books found.</p>';
      return;
    }

    const tableHeader = `
      <tr>
        <th class="p-2 border">ID</th>
        <th class="p-2 border">Title</th>
        <th class="p-2 border">Available Copies</th>
        <th class="p-2 border">Total Copies</th>
        <th class="p-2 border">Actions</th>
      </tr>
    `;

    const booksHTML = books
      .map(
        (book: book) => `
        <tr>
          <td class="p-2 border">${book.id}</td>
          <td class="p-2 border">${book.title || "Untitled"}</td>
          <td class="p-2 border">${book.available_copies}</td>
          <td class="p-2 border">${book.total_copies}</td>
          <td class="p-2 border flex space-x-2">
            <button class="text-yellow-500 font-bold hover:underline edit-btn" data-user='${JSON.stringify(book)}'>Edit</button>
            <button class="text-red-500 font-bold hover:underline delete-btn" data-id="${book.id}">Delete</button>
          </td>
        </tr>
      `
      )
      .join("");

    this.bookTable.innerHTML = `
      <table class="w-full border-collapse border">
        ${tableHeader}
        ${booksHTML}
      </table>
    `;
  }

  static async deleteBook(id: string) {
    if (!confirm("Are you sure you want to delete this Book?")) {
      return;
    }
    try {
      await BookApi.deleteBookById(id);
      this.handleSearch();
      Toast.showToast("Book deleted successfully.", "success");
    } catch (error) {
      Toast.showToast(
        "An error occurred while deleting the user. Please try again.",
        "error"
      );
    }
  }
  static async openEditPopup(book: book) {
    console.log(book)
  }

  static handleDeleteButton(target: HTMLElement) {
    const bookId = target.dataset.id;
    if (bookId) {
      this.deleteBook(bookId);
    }
  }
  
  static handleEditButton(target: HTMLElement) {
    const userData = target.dataset.user;
    if (userData) {
      this.openEditPopup(JSON.parse(userData));
    }
  }

  static async handleFormSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const imageInput = document.getElementById("image") as HTMLInputElement;
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const isbnInput = document.getElementById("isbn") as HTMLInputElement;
    const authorsInput = document.getElementById("authors") as HTMLInputElement;
    const genresInput = document.getElementById("genres") as HTMLInputElement;
    const publishedDateInput = document.getElementById("publishedDate") as HTMLInputElement;
    const totalCopiesInput = document.getElementById("totalCopies") as HTMLInputElement;

    const file = imageInput.files?.[0];
    if (!file) {
        Toast.showToast('Please select an image for the book', 'error');
        return;
    }

    const authors = authorsInput.value.split(',').map(author => author.trim());
    const genres = genresInput.value.split(',').map(genre => genre.trim());

    try {
        const formData = new FormData();

        // Append each field manually
        formData.append('photo', file);
        formData.append('title', titleInput.value);
        formData.append('isbn', isbnInput.value);
        formData.append('publishedDate', publishedDateInput.value);
        formData.append('totalCopies', totalCopiesInput.value);
        // Append each author and genre individually
        authors.forEach((author, index) => {
          formData.append(`authors[${index}]`, author);
        });
        genres.forEach((genre, index) => {
            formData.append(`genres[${index}]`, genre);
        });

        await BookApi.createBook(formData);

        Toast.showToast("Added new book", "success");
        // Clear the form fields after successful submission
        form.reset();
    } catch (err) {
        Toast.showToast("An error occurred while adding the book. Please try again.", "error");
    }
}
}
