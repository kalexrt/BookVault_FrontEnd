import { BorrowApi } from "../api/borrow.api";
import { borrow } from "../interfaces/borrow.interface";
import { formatDate } from "../utils/formatDate";
import { Toast } from "../utils/toast";
import { Pagination } from "./pagination.script";

export class manageBorrowActions {
  private static searchInput: HTMLInputElement;
  private static searchBtn: HTMLButtonElement;
  private static borrowTable: HTMLDivElement;
  private static issueBookBtn: HTMLButtonElement;
  private static issueBookPopup: HTMLElement;
  private static searchType: HTMLSelectElement;

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
    this.issueBookBtn = document.getElementById(
      "issueBookBtn"
    ) as HTMLButtonElement;
    this.issueBookPopup = document.getElementById(
      "issueBookPopup"
    ) as HTMLElement;
    this.borrowTable = document.getElementById("borrowTable") as HTMLDivElement;
    this.searchType = document.getElementById(
      "searchType"
    ) as HTMLSelectElement;

    //Initialize pagination
    this.pagination = new Pagination("paginationContainer", (page) => {
      this.currentPage = page;
      this.handleSearch();
    });

    this.handleSearch(); // Perform the search for initial page load

    //Initialize event listeners
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
    this.searchType.addEventListener("change", () => {
      if (this.searchType.value === "book") {
        this.searchInput.placeholder = "Search for Loans by book title...";
      } else {
        this.searchInput.placeholder = "Search for Loans by user name...";
      }
    });
    //open popup when Issue Book button is clicked
    this.issueBookBtn.addEventListener("click", () => {
      this.issueBookPopup.classList.remove("hidden");
    });
    //close popup when clicking outside the form
    this.issueBookPopup.addEventListener("click", (e) => {
      if (e.target === this.issueBookPopup) {
        this.issueBookPopup.classList.add("hidden");
      }
    });
  }

  static async handleSearch() {
    try {
      const searchTerm = (
        document.getElementById("searchInput") as HTMLInputElement
      ).value;
      const searchType = (
        document.getElementById("searchType") as HTMLSelectElement
      ).value;

      let queryParams: { [key: string]: string } = {};
      if (searchType === "book") {
        queryParams.book = searchTerm;
      } else if (searchType === "user") {
        queryParams.user = searchTerm;
      }
      const borrows = await BorrowApi.getBorrows(
        this.currentPage,
        this.itemsPerPage,
        queryParams
      );
      //for setting total pages
      this.totalItems = borrows.meta.total;
      const totalPages = Math.ceil(this.totalItems! / this.itemsPerPage);
      this.renderBorrows(borrows.data);
      this.pagination.update(this.currentPage, totalPages);
    } catch (err) {
      Toast.showToast(
        "An error occurred while fetching current loans. Please try again.",
        "error"
      );
    }
  }

  static renderBorrows(borrows: borrow[]) {
    if (borrows.length === 0) {
      this.borrowTable.innerHTML = '<p class="text-center">No staff found.</p>';
      return;
    }
    const tableHeader = `
      <tr>
        <th class="p-2 border">ID</th>
        <th class="p-2 border">User Name</th>
        <th class="p-2 border">Book Title</th>
        <th class="p-2 border">Due Date</th>
        <th class="p-2 border">Action</th>
      </tr>
    `;

    const borrowsHTML = borrows
      .map(
        (borrow: borrow) => `
        <tr>
          <td class="p-2 border">${borrow.id}</td>
          <td class="p-2 border">${borrow.user_name}</td>
          <td class="p-2 border">${borrow.book_title}</td>
          <td class="p-2 border">${formatDate(borrow.due_date!)}</td>
          <td class="p-2 border flex space-x-2">
            <button class="hover:bg-green-500 delete-btn" data-id="${
              borrow.id
            }">↩</button>
          </td>
        </tr>
      `
      )
      .join("");

    this.borrowTable.innerHTML = `
      <table class="w-full border-collapse border">
        ${tableHeader}
        ${borrowsHTML}
      </table>
    `;
  }
}
