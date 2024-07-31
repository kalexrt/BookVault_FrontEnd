import { BookApi } from "../api/book.api";
import { book } from "../interfaces/book.interface";
import { Toast } from "../utils/toast";
import { Pagination } from "./pagination.script";

export class manageBookActions {
  private static searchInput: HTMLInputElement;
  private static searchBtn: HTMLButtonElement;
  private static bookTable: HTMLDivElement;

  private static pagination: Pagination;
  private static currentPage: number = 1;
  private static itemsPerPage: number = 15;
  private static totalItems: number | null = null;

  static init() {
    //Initialize elements
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
      Toast.showToast("Books fetched successfully.", "success");
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
            <button class="text-yellow-500 font-bold hover:underline" onclick="openEditPopup(${JSON.stringify(
              book
            )})">Edit</button>
            <button class="text-red-500  font-bold hover:underline" onclick="deletebook(${
              book.id
            })">Delete</button>
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
}
