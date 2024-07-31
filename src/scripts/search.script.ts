import { BookApi } from "../api/book.api";
import { book } from "../interfaces/book.interface";
import { Toast } from "../utils/toast";
import { Pagination } from "./pagination.script";

export class SearchActions {
  private static searchInput: HTMLInputElement;
  private static searchBtn: HTMLButtonElement;
  private static genreSelect: HTMLSelectElement;
  private static isbnInput: HTMLInputElement;
  private static authorInput: HTMLInputElement;
  private static applyFiltersBtn: HTMLButtonElement;
  private static bookResults: HTMLDivElement;

  private static pagination: Pagination;
  private static currentPage: number = 1;
  private static itemsPerPage: number = 8;
  private static totalItems: number | null = null;

  static init() {
    // Initialize elements
    this.searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    this.searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
    this.genreSelect = document.getElementById("genre") as HTMLSelectElement;
    this.isbnInput = document.getElementById("isbn") as HTMLInputElement;
    this.authorInput = document.getElementById("author") as HTMLInputElement;
    this.applyFiltersBtn = document.getElementById(
      "applyFiltersBtn"
    ) as HTMLButtonElement;
    this.bookResults = document.getElementById("bookResults") as HTMLDivElement;

    //for home page search result
    const storedSearchTerm = sessionStorage.getItem("homeSearchTerm");
    this.searchInput.value = storedSearchTerm!;
    sessionStorage.removeItem("homeSearchTerm"); // Clear the stored search term
    this.handleSearch(); // Perform the search

    // Add event listeners
    this.applyFiltersBtn.addEventListener("click", () => {
      this.currentPage = 1;
      this.handleSearch();
    });
    this.searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.currentPage = 1;
      this.handleSearch();
    });
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.currentPage = 1;
        this.handleSearch();
      }
    });

    // Initialize pagination
    this.pagination = new Pagination("paginationContainer", (page) => {
      this.currentPage = page;
      this.handleSearch();
    });
  }

  static async handleSearch() {
    const searchTerm = this.searchInput.value;
    const genre = this.genreSelect.value;
    const isbn = this.isbnInput.value;
    const author = this.authorInput.value;

    // Show loading state
    this.bookResults.innerHTML = '<p class="text-center">Loading...</p>';

    try {
      const books = await BookApi.getBooks(
        this.currentPage,
        this.itemsPerPage,
        {
          title: searchTerm,
          genre,
          isbn,
          author,
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

  //render books function
  static renderBooks(books: book[]) {
    if (!Array.isArray(books)) {
      console.error(
        "Expected books to be an array, but received:",
        typeof books
      );
      this.bookResults.innerHTML =
        '<p class="text-center text-red-500">Error: Unexpected data format received.</p>';
      return;
    }

    if (books.length === 0) {
      this.bookResults.innerHTML = '<p class="text-center">No books found.</p>';
      return;
    }

    const booksHTML = books
      .map(
        (book: book) => `
        <a href="#/book/${book.id}" 
        class="block transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg">
        <div class="bg-white p-4 rounded shadow transition duration-300 ease-in-out hover:bg-orange-100">
          <img src="${book.image_link || "book-cover-placeholder.jpg"}"
              alt="${book.title || "Book"} Cover"
              class="w-full h-48 object-cover mb-2 transition duration-300 ease-in-out hover:opacity-80">
          <h2 class="text-lg text-black font-semibold transition duration-300 ease-in-out group-hover:text-orange-600">${
            book.title || "Untitled"
          }</h2>
          <p class="text-sm text-gray-600">${
            book.authors ? book.authors.join(", ") : "Unknown Author"
          }</p>
          <p class="text-sm text-gray-800 mt-2">ISBN: ${book.isbn || "N/A"}</p>
          ${
            book.rating
              ? `<p class="text-sm text-yellow-500">Rating: ${book.rating.toFixed(
                  1
                )}/5 (${book.totalReviews} reviews)</p>`
              : ""
          }
          <p class="text-sm text-green-600">Available: ${book.available_copies}/${
                book.total_copies
              }</p>
        </div>
      </a>
      `
      )
      .join("");

    this.bookResults.innerHTML = booksHTML;
  }
}
