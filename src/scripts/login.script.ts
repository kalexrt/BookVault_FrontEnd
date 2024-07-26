import { togglePassword } from "../utils/togglePassword";
import { AxiosError } from "axios";
import { authApi } from "../api/auth.api";
import { displayResponseErrors } from "../utils/errorHandler";

export class LoginActions {
  static init: () => void = () => {
    //get form
    const form = document.getElementById("loginForm") as HTMLFormElement;
    //handle submit button
    form.addEventListener("submit",this.handleFormSubmit);

    //handle pasword toggle
    const showPasswordToggle = document.getElementById(
      "showPasswordToggle"
    ) as HTMLButtonElement;
    if (showPasswordToggle) {
      showPasswordToggle.addEventListener("click", () =>
        togglePassword("password", showPasswordToggle)
      );
    }
  };

  static async handleFormSubmit(event: Event) {
    event.preventDefault();
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    try{
      const response = await authApi.login({ email: emailInput.value, password: passwordInput.value });
    }catch(err){
      if(err instanceof AxiosError){
        const errorMessage = err.response?.data?.message || err.message;
        displayResponseErrors(errorMessage);
        emailInput.value = "";
        passwordInput.value = "";
      }
    }
  }
}
