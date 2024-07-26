import { passwordValidator } from "../utils/confirmPasswordValidator";
import { Toast } from "../utils/toast";
import { togglePassword } from "../utils/togglePassword";

export class RegisterActions {
  static init: () => void = () => {
    const form = document.getElementById("signupForm") as HTMLFormElement;

    form.addEventListener("submit", this.handleFormSubmit);

    //show password
    const showPasswordToggle = document.getElementById("showPasswordToggle") as HTMLButtonElement;
    if (showPasswordToggle) {
      showPasswordToggle.addEventListener("click", () =>
        togglePassword("password", showPasswordToggle)
      );
    }

    //show confirm password
    const showConfirmPasswordToggle = document.getElementById("showConfirmPasswordToggle") as HTMLButtonElement;
    if (showConfirmPasswordToggle) {
      showConfirmPasswordToggle.addEventListener("click", () =>
        togglePassword("confirmPassword", showConfirmPasswordToggle)
      );
    }

    //confirm password validation
    passwordValidator();
  };

  //after form is submitted
  static handleFormSubmit(event: Event) {
    event.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const ageInput = document.getElementById("age") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const genderInput = document.getElementById("gender") as HTMLSelectElement;

    Toast.showToast("Form submitted successfully, Please Wait", "success");
  }


  // //form validation
  // static validateForm(): boolean {
  //   const nameInput = document.getElementById("name") as HTMLInputElement;
  //   const ageInput = document.getElementById("age") as HTMLInputElement;
  //   const emailInput = document.getElementById("email") as HTMLInputElement;
  //   const passwordInput = document.getElementById("password") as HTMLInputElement;
  //   const confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;
  //   const genderInput = document.getElementById("gender") as HTMLSelectElement;

  //   let isValid = true;

  //   // Validate name
  //   if (nameInput.value.trim() === "") {
  //       nameInput.setCustomValidity("Name is required");
  //       isValid = false;
  //   } else {
  //       nameInput.setCustomValidity("");
  //   }

  //   // Validate age
  //   const age = parseInt(ageInput.value, 10);
  //   if (isNaN(age) || age <= 0) {
  //       ageInput.setCustomValidity("Valid age is required");
  //       isValid = false;
  //   } else {
  //       ageInput.setCustomValidity("");
  //   }

  //   // Validate email
  //   const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  //   if (!emailPattern.test(emailInput.value)) {
  //       emailInput.setCustomValidity("Valid email is required");
  //       isValid = false;
  //   } else {
  //       emailInput.setCustomValidity("");
  //   }

  //   // Validate password
  //   if (passwordInput.value.trim() === "") {
  //       passwordInput.setCustomValidity("Password is required");
  //       isValid = false;
  //   } else {
  //       passwordInput.setCustomValidity("");
  //   }

  //   // Validate confirm password
  //   if (confirmPasswordInput.value !== passwordInput.value) {
  //       confirmPasswordInput.setCustomValidity("Passwords do not match");
  //       isValid = false;
  //   } else {
  //       confirmPasswordInput.setCustomValidity("");
  //   }

  //   // Validate gender
  //   if (genderInput.value.trim() === "") {
  //       genderInput.setCustomValidity("Gender is required");
  //       isValid = false;
  //   } else {
  //       genderInput.setCustomValidity("");
  //   }

  //   return isValid;
  // }
}
