import { UserApi } from "../api/user.api";
import { Router } from "../router";

export class AdminNavActions {
  static init() {
    //for logout
    const logoutBtn = document.getElementById("logout") as HTMLElement;
    logoutBtn.addEventListener("click", AdminNavActions.handleLogout);
  }

  //handling logout button
  static handleLogout() {
    const validAccessToken = localStorage.getItem("accessToken");
    if (validAccessToken) {
      //handle logout
      localStorage.removeItem("accessToken");
      //redirect to home
      window.history.pushState({}, "", "/#/home");
      Router.loadContent();
    }
  }

  static async updateForRole() {
    const user = await UserApi.getMyProfile();
    if (user.roles.includes("SuperAdmin")) {
      // SuperAdmin gets access to everything
      document.querySelectorAll(".admin-only").forEach((elem) => {
        elem.classList.remove("hidden");
      });
    } else if (user.roles.includes("Librarian")) {
      // Librarian gets access to librarian-only sections, hide admin-only sections
      document.querySelectorAll(".admin-only").forEach((elem) => {
        elem.classList.add("hidden");
      });
    } else {
      // Redirect to home for any other roles not accounted for
      window.history.pushState({}, "", "/#/home");
      Router.loadContent();
    }
  }
}
