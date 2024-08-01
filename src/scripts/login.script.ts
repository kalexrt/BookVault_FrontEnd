import { togglePassword } from "../utils/togglePassword";
import { AxiosError } from "axios";
import { AuthApi } from "../api/auth.api";
import { displayResponseErrors } from "../utils/errorHandler";
import { Toast } from "../utils/toast";
import { Router } from "../router";
import { UserApi } from "../api/user.api";

export class LoginActions {
  static init() {
    //get form
    const form = document.getElementById("loginForm") as HTMLFormElement;
    //handle submit button
    form.addEventListener("submit", this.handleFormSubmit);

    //handle pasword toggle
    const showPasswordToggle = document.getElementById(
      "showPasswordToggle"
    ) as HTMLButtonElement;
    if (showPasswordToggle) {
      showPasswordToggle.addEventListener("click", () =>
        togglePassword("password", showPasswordToggle)
      );
    }
  }

  //handle login form submit
  static async handleFormSubmit(event: Event) {
    event.preventDefault();
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    try {
      const response = await AuthApi.login({
        email: emailInput.value,
        password: passwordInput.value,
      });
      //set access token
      localStorage.setItem("accessToken", response.accessToken);

      const user = await UserApi.getMyProfile();
      if (user.roles.includes("SuperAdmin")) {
        //redirect to admin dashboard
        window.history.pushState({}, "", "/#/manage-user")
      } else if (user.roles.includes("Librarian")) {
        //redirect to manage book
        window.history.pushState({}, "", "/#/manage-book")
      } else {
        //redirect to home
        window.history.pushState({}, "", "/#/home");
      }
      Router.loadContent();
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || err.message;
        displayResponseErrors(errorMessage);
        Toast.showToast(errorMessage, "error");
        //clear inputs
        emailInput.value = "";
        passwordInput.value = "";
      } else {
        Toast.showToast("An unexpected error occurred", "error");
      }
    }
  }
}
