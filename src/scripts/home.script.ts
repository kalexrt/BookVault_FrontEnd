import { Router } from "../router";

export class HomeActions {
  static init() {
    const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;

    searchInput.addEventListener("keydown", HomeActions.handleKeyDown);
    searchBtn.addEventListener("click", HomeActions.handleSearchCall);
  }

  static async handleSearchCall() {
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
      // Store the search term in sessionStorage
      sessionStorage.setItem("homeSearchTerm", searchTerm);

      // Navigate to the search page
      window.history.pushState({}, "", "/#/search");
      Router.loadContent();
    }
  }

  static handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      HomeActions.handleSearchCall();
    }
  }
}
