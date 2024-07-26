import { togglePassword } from "../utils/togglePassword";

export class RegisterActions{

    static init: () => void = () => {
        const form = document.getElementById("signupForm") as HTMLFormElement;
        
        //
        form.addEventListener("submit", this.handleFormSubmit);

        //show password
        const showPasswordToggle = document.getElementById("showPasswordToggle") as HTMLButtonElement;
        if (showPasswordToggle) {
            showPasswordToggle.addEventListener("click", () => togglePassword('password', showPasswordToggle));
        }

        //show confirm password
        const showConfirmPasswordToggle = document.getElementById("showConfirmPasswordToggle") as HTMLButtonElement;
        if (showConfirmPasswordToggle) {
            showConfirmPasswordToggle.addEventListener("click", () => togglePassword('confirmPassword', showConfirmPasswordToggle));
        }
    };


    static handleFormSubmit(event:Event) {
      console.log("Form submitted", event);
    }
}