import { StaffApi } from "../api/staff.api";
import { UserApi } from "../api/user.api";
import { user } from "../interfaces/user.interface";
import { manageDeleteAndEditEventListeners } from "../utils/adminEditAndDeleteEvents";
import { Toast } from "../utils/toast";
import { Pagination } from "./pagination.script";

export class manageStaffActions {
  private static form: HTMLFormElement;
  private static searchInput: HTMLInputElement;
  private static searchBtn: HTMLButtonElement;
  private static staffTable: HTMLDivElement;
  private static addStaffBtn: HTMLButtonElement;
  private static addStaffPopup: HTMLElement;
  private static editStaffPopup: HTMLElement;

  private static pagination: Pagination;
  private static currentPage: number = 1;
  private static itemsPerPage: number = 15;
  private static totalItems: number | null = null;

  static init() {
    //Initialize elements
    this.form = document.getElementById("addStaffForm") as HTMLFormElement;
    this.searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    this.searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
    this.addStaffBtn = document.getElementById(
      "addStaffBtn"
    ) as HTMLButtonElement;
    this.addStaffPopup = document.getElementById(
      "addStaffPopup"
    ) as HTMLElement;
    this.staffTable = document.getElementById("staffTable") as HTMLDivElement;
    this.editStaffPopup = document.getElementById(
      "editStaffPopup"
    ) as HTMLElement;

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
    // Open popup when Add Staff button is clicked
    this.addStaffBtn.addEventListener("click", () => {
      this.addStaffPopup.classList.remove("hidden");
    });

    // Close popup when clicking outside the form
    this.addStaffPopup.addEventListener("click", (e) => {
      if (e.target === this.addStaffPopup) {
        this.handleSearch();
        this.addStaffPopup.classList.add("hidden");
      }
    });
    // Close edit user popup when clicking outside the form
    this.editStaffPopup.addEventListener("click", (e) => {
      if (e.target === this.editStaffPopup) {
        this.editStaffPopup.classList.add("hidden");
      }
    });
    this.form.addEventListener("submit", this.handleFormSubmit);

    //to add event listeners to the action buttons before they render
    manageDeleteAndEditEventListeners(manageStaffActions);
  }

  static async handleSearch() {
    const searchTerm = this.searchInput.value;
    try {
      const staffs = await StaffApi.getStaffs(
        this.currentPage,
        this.itemsPerPage,
        {
          q: searchTerm,
        }
      );
      //for setting total pages
      this.totalItems = staffs.meta.total;
      const totalPages = Math.ceil(this.totalItems! / this.itemsPerPage);

      this.renderUsers(staffs.data);
      this.pagination.update(this.currentPage, totalPages);
    } catch (error) {
      Toast.showToast(
        "An error occurred while fetching staffs. Please try again.",
        "error"
      );
    }
  }

  static renderUsers(staffs: user[]) {
    if (staffs.length === 0) {
      this.staffTable.innerHTML = '<p class="text-center">No staff found.</p>';
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

    const staffsHTML = staffs
      .map(
        (staff: user) => `
        <tr>
          <td class="p-2 border">${staff.id}</td>
          <td class="p-2 border">${staff.name}</td>
          <td class="p-2 border">${staff.email}</td>
          <td class="p-2 border flex space-x-2">
            <button class="hover:bg-yellow-500 edit-btn" data-user='${JSON.stringify(
              staff
            )}'>📝</button>
            <button class="hover:bg-red-500 delete-btn" data-id="${
              staff.id
            }">🗑</button>
          </td>
        </tr>
      `
      )
      .join("");

    this.staffTable.innerHTML = `
      <table class="w-full border-collapse border">
        ${tableHeader}
        ${staffsHTML}
      </table>
    `;
  }
  static async deleteStaff(id: string) {
    if (!confirm("Are you sure you want to delete this staff?")) {
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
    const staffId = target.dataset.id;
    if (staffId) {
      this.deleteStaff(staffId);
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

    const staffData = {
      name: nameInput.value,
      age: +ageInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      gender: genderInput.value,
    };

    try {
      await StaffApi.createStaff(staffData);
      Toast.showToast("Created new staff", "success");

      // Clear the form fields after successful submission
      form.reset();
    } catch (err) {
      Toast.showToast(
        "An error occurred while creating the staff. Please try again.",
        "error"
      );
    }
  }

  static handleEditButton(target: HTMLElement) {
    const userData = target.dataset.user;
    const user = JSON.parse(userData!);

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
    const editStaffPopup = document.getElementById(
      "editStaffPopup"
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

    editStaffPopup.classList.remove("hidden");
  }

   // Wrapper function to handle the event and pass the userId
   private static handleEditSubmitWrapper = (e: Event) => {
    const submitButton = e.target as HTMLButtonElement;
    const userId = submitButton.dataset.userId;
    if (userId) {
      this.handleEditSubmit(e, userId);
    }
  };

  static async handleEditSubmit(event: Event, staffId: string) {
    event.preventDefault();
    const form = document.getElementById("editStaffForm") as HTMLFormElement;
    const popUp = document.getElementById("editStaffPopup") as HTMLElement;
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
      await UserApi.editUser(staffId,userData)
      Toast.showToast("Staff updated successfully.", "success");
      //reset form, remove popup and refresh search
      form.reset();
      popUp.classList.add("hidden");
      manageStaffActions.handleSearch();
    }catch(err){
      Toast.showToast(
        "An error occurred while updating the user. Please try again.",
        "error"
      );
    }
  }

}
