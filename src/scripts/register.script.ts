import { user } from "../interfaces/user.interface";
import { passwordValidator } from "../utils/confirmPasswordValidator";
import { Toast } from "../utils/toast";
import { togglePassword } from "../utils/togglePassword";
import { AuthApi } from "../api/auth.api";
import { LoginActions } from "./login.script";

export class RegisterActions {
  static init() {
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
  }

  //after form is submitted
  static async handleFormSubmit(event: Event) {
    event.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const ageInput = document.getElementById("age") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;
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
      //autologin
      LoginActions.login(emailInput.value, passwordInput.value);
    } catch (err) {
        nameInput.value=""
        ageInput.value = ""
        emailInput.value=""
        passwordInput.value=""
        genderInput.value=""
        confirmPasswordInput.value=""

        Toast.showToast("Error registering user", "error");
    }
  }
}
