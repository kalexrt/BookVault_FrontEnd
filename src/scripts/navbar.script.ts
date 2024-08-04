import { Router } from "../router";
import { NotificationActions } from "./notification.script";

export class NavBarActions {
  static init() {
    //for home
    const homeBtn = document.getElementById("homeBtn") as HTMLElement;
    if (homeBtn) homeBtn.addEventListener("click", NavBarActions.handleHome);

    //for logout
    const logoutBtn = document.getElementById("logoutBtn") as HTMLElement;
    if (logoutBtn)
      logoutBtn.addEventListener("click", NavBarActions.handleLogout);

    //for login
    const loginBtn = document.getElementById("loginBtn") as HTMLElement;
    if (loginBtn) loginBtn.addEventListener("click", NavBarActions.handleLogin);

    //for profile
    const profileBtn = document.getElementById("profileBtn") as HTMLElement;
    if (profileBtn)
      profileBtn.addEventListener("click", NavBarActions.handleProfile);

    //for notification
    const notificationBtn = document.getElementById(
      "notificationBtn"
    ) as HTMLElement;
    if (notificationBtn)
      notificationBtn.addEventListener(
        "click",
        NavBarActions.handleNotification
      );

    //for about us
    const aboutUsBtn = document.getElementById("aboutUsBtn") as HTMLElement;
    if (aboutUsBtn)
      aboutUsBtn.addEventListener("click", NavBarActions.handleAboutUs);
  }
  //dynamic navbar depending on login
  static async updateNavbarForLoggedInUser() {
    const accessToken = localStorage.getItem("accessToken") as string;
    const notificationIcon = document.getElementById(
      "notificationBtn"
    ) as HTMLElement;
    const profileIcon = document.getElementById("profileBtn") as HTMLElement;
    const loginIcon = document.getElementById("loginBtn") as HTMLElement;
    const logoutIcon = document.getElementById("logoutBtn") as HTMLElement;

    if (accessToken !== null && accessToken !== undefined) {
      notificationIcon.classList.remove("hidden");
      profileIcon.classList.remove("hidden");
      loginIcon.classList.add("hidden");
      logoutIcon.classList.remove("hidden");
    }
  }
  //hanle home button
  static handleHome() {
    window.history.pushState({}, "", "/#/home");
    Router.loadContent();
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

  //handling login button
  static handleLogin() {
    window.history.pushState({}, "", "/#/login");
    Router.loadContent();
  }

  //handle profile button
  static handleProfile() {
    window.history.pushState({}, "", "/#/my-profile");
    Router.loadContent();
  }

  //handle notification button
  static handleNotification() {
    const dropdown = document.getElementById("notificationDropdown");
    if (dropdown) dropdown.classList.toggle("hidden");
    NotificationActions.handleSearch();
  }

  //handle about us button
  static handleAboutUs() {
    window.history.pushState({}, "", "/#/about-us");
    Router.loadContent();
  }
}
