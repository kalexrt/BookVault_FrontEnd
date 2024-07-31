import { UserApi } from "../api/user.api";
import { user } from "../interfaces/user.interface";
import { Toast } from "../utils/toast";
import { Pagination } from "./pagination.script";

export class manageUserActions {
  private static searchInput: HTMLInputElement;
  private static searchBtn: HTMLButtonElement;
  private static userTable: HTMLDivElement;

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
    this.userTable = document.getElementById("userTable") as HTMLDivElement;

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
      const users = await UserApi.getUsers(
        this.currentPage,
        this.itemsPerPage,
        {
          q: searchTerm,
        }
      );
      //for setting total pages
      this.totalItems = users.meta.total;
      const totalPages = Math.ceil(this.totalItems! / this.itemsPerPage);
      this.renderUsers(users.data);
      this.pagination.update(this.currentPage, totalPages);

      Toast.showToast("Users fetched successfully.", "success");

    } catch (error) {
      Toast.showToast(
        "An error occurred while fetching users. Please try again.",
        "error"
      );
    }
  }

  static renderUsers(users: user[]) {
    if (users.length === 0) {
      this.userTable.innerHTML = '<p class="text-center">No user found.</p>';
      return;
    }

    const tableHeader = `
      <tr>
        <th class="p-2 border">ID</th>
        <th class="p-2 border">Name</th>
        <th class="p-2 border">Email</th>
        <th class="p-2 border">Actions</th>
      </tr>
    `;

    const usersHTML = users
      .map(
        (user: user) => `
        <tr>
          <td class="p-2 border">${user.id}</td>
          <td class="p-2 border">${user.name}</td>
          <td class="p-2 border">${user.email}</td>
          <td class="p-2 border flex space-x-2">
            <button class="text-yellow-500 font-bold hover:underline" onclick="openEditPopup(${JSON.stringify(
              user
            )})">Edit</button>
            <button class="text-red-500  font-bold hover:underline" onclick="deletebook(${
              user.id
            })">Delete</button>
          </td>
        </tr>
      `
      )
      .join("");

    this.userTable.innerHTML = `
      <table class="w-full border-collapse border">
        ${tableHeader}
        ${usersHTML}
      </table>
    `;
  }
}
