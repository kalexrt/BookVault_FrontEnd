import { UserApi } from "../api/user.api";
import { user } from "../interfaces/user.interface";
import { manageDeleteAndEditEventListeners } from "../utils/adminEditAndDeleteEvents";
import { Toast } from "../utils/toast";
import { Pagination } from "./pagination.script";

export class manageUserActions {
  private static form: HTMLFormElement;
  private static searchInput: HTMLInputElement;
  private static searchBtn: HTMLButtonElement;
  private static addUserBtn: HTMLButtonElement;
  private static addUserPopup: HTMLElement;
  private static editUserPopup: HTMLElement;
  private static userTable: HTMLDivElement;

  private static pagination: Pagination;
  private static currentPage: number = 1;
  private static itemsPerPage: number = 15;
  private static totalItems: number | null = null;

  static init() {
    //Initialize elements
    this.form = document.getElementById("addUserForm") as HTMLFormElement;
    this.searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    this.searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
    this.addUserBtn = document.getElementById(
      "addUserBtn"
    ) as HTMLButtonElement;
    this.addUserPopup = document.getElementById("addUserPopup") as HTMLElement;
    this.editUserPopup = document.getElementById(
      "editUserPopup"
    ) as HTMLElement;
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
    // Open popup when Add User button is clicked
    this.addUserBtn.addEventListener("click", () => {
      this.addUserPopup.classList.remove("hidden");
    });

    // Close popup when clicking outside the form
    this.addUserPopup.addEventListener("click", (e) => {
      if (e.target === this.addUserPopup) {
        this.addUserPopup.classList.add("hidden");
      }
    });

    // Close edit user popup when clicking outside the form
    this.editUserPopup.addEventListener("click", (e) => {
      if (e.target === this.editUserPopup) {
        this.editUserPopup.classList.add("hidden");
      }
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
    manageDeleteAndEditEventListeners(manageUserActions);
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
            <button class="hover:bg-yellow-500 edit-btn" data-user='${JSON.stringify(
              user
            )}'>📝</button>
            <button class="hover:bg-red-500 delete-btn" data-id="${
              user.id
            }">🗑</button>
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

  static async deleteUser(id: string) {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      await UserApi.deleteUser(id);
      this.handleSearch();
      Toast.showToast("User deleted successfully.", "success");
    } catch (error) {
      Toast.showToast(
        "An error occurred while deleting the user. Please try again.",
        "error"
      );
    }
  }

  static handleDeleteButton(target: HTMLElement) {
    const userId = target.dataset.id;
    if (userId) {
      this.deleteUser(userId);
    }
  }

  static async handleFormSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const ageInput = document.getElementById("age") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const confirmPasswordInput = document.getElementById(
      "confirmPassword"
    ) as HTMLInputElement;
    const genderInput = document.getElementById("gender") as HTMLSelectElement;

    if (passwordInput.value !== confirmPasswordInput.value) {
      Toast.showToast("Passwords do not match", "error");
      return;
    }

    const userData = {
      name: nameInput.value,
      age: +ageInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      gender: genderInput.value,
    };

    try {
      await UserApi.createUser(userData);
      Toast.showToast("Created new user", "success");

      // Clear the form fields after successful submission
      form.reset();
    } catch (err) {
      Toast.showToast(
        "An error occurred while creating the user. Please try again.",
        "error"
      );
    }
  }

  static handleEditButton(target: HTMLElement) {
    const userData = target.dataset.user;
    if (!userData) {
      console.error("No user data found");
      return;
    }

    const user = JSON.parse(userData);

    const editNameInput = document.getElementById(
      "editName"
    ) as HTMLInputElement;
    const editEmailInput = document.getElementById(
      "editEmail"
    ) as HTMLInputElement;
    const editAgeInput = document.getElementById(
      "editAge"
    ) as HTMLInputElement;
    const editGenderSelect = document.getElementById(
      "editGender"
    ) as HTMLSelectElement;
    const submitButton = document.getElementById(
      "editSubmit"
    ) as HTMLButtonElement ;
    const editUserPopup = document.getElementById(
      "editUserPopup"
    ) as HTMLElement ;


    editNameInput.value = user.name;
    editEmailInput.value = user.email;
    editAgeInput.value = user.age.toString();
    editGenderSelect.value = user.gender;

    // Remove any existing event listeners to prevent duplicates
    submitButton.removeEventListener("click", this.handleEditSubmitWrapper);

    // Add a new event listener
    submitButton.addEventListener("click", this.handleEditSubmitWrapper);

    // Store the userId for later use
    submitButton.dataset.userId = user.id;

    editUserPopup.classList.remove("hidden");
  }

  // Wrapper function to handle the event and pass the userId
  private static handleEditSubmitWrapper = (e: Event) => {
    const submitButton = e.target as HTMLButtonElement;
    const userId = submitButton.dataset.userId;
    if (userId) {
      this.handleEditSubmit(e, userId);
    }
  };

  static async handleEditSubmit(event: Event, userId: string) {
    event.preventDefault();
    const form = document.getElementById("editUserForm") as HTMLFormElement;
    const popUp = document.getElementById("editUserPopup") as HTMLElement;
    const nameInput = document.getElementById("editName") as HTMLInputElement;
    const emailInput = document.getElementById("editEmail") as HTMLInputElement;
    const ageInput = document.getElementById("editAge") as HTMLInputElement;
    const genderSelect = document.getElementById("editGender") as HTMLSelectElement;
    const passwordInput = document.getElementById("editPassword") as HTMLInputElement;

    const userData = {
      name: nameInput.value,
      email: emailInput.value,
      age: +ageInput.value,
      gender: genderSelect.value,
      password: passwordInput.value,
    };

    try {
      await UserApi.editUser(userId,userData)
      Toast.showToast("User updated successfully.", "success");
      //reset form, remove popup and refresh search
      form.reset();
      popUp.classList.add("hidden");
      manageUserActions.handleSearch();
    }catch(err){
      Toast.showToast(
        "An error occurred while updating the user. Please try again.",
        "error"
      );
    }
  }
}
