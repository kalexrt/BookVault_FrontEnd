import { user } from "../interfaces/user.interface";
import { passwordValidator } from "../utils/confirmPasswordValidator";
import { Toast } from "../utils/toast";
import { togglePassword } from "../utils/togglePassword";
import { AxiosError } from "axios";
import { AuthApi } from "../api/auth.api";
import { Router } from "../router";

export class RegisterActions {
  static init(){
    const form = document.getElementById("signupForm") as HTMLFormElement;

    form.addEventListener("submit", this.handleFormSubmit);

    //show password
    const showPasswordToggle = document.getElementById(
      "showPasswordToggle"
    ) as HTMLButtonElement;
    if (showPasswordToggle) {
      showPasswordToggle.addEventListener("click", () =>
        togglePassword("password", showPasswordToggle)
      );
    }

    //show confirm password
    const showConfirmPasswordToggle = document.getElementById(
      "showConfirmPasswordToggle"
    ) as HTMLButtonElement;
    if (showConfirmPasswordToggle) {
      showConfirmPasswordToggle.addEventListener("click", () =>
        togglePassword("confirmPassword", showConfirmPasswordToggle)
      );
    }

    //confirm password validation
    passwordValidator();
  };

  //after form is submitted
  static async handleFormSubmit(event: Event) {
    event.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const ageInput = document.getElementById("age") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const genderInput = document.getElementById("gender") as HTMLSelectElement;

    const data: user = {
      name: nameInput.value,
      age: +ageInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      gender: genderInput.value,
    };

    try {
      await AuthApi.register(data);
      Toast.showToast("Registration successful", "success");
      window.history.pushState({}, "", "/#/login");
      Router.loadContent();
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || err.message;
        Toast.showToast(errorMessage, "error");
        emailInput.value = "";
        passwordInput.value = "";
      } else {
        Toast.showToast("An unexpected error occurred", "error");
      }
    }
  }
}
