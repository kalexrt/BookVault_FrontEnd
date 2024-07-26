import { passwordSchema } from "../schema/password.schema";

export function passwordValidator() {
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;
    passwordInput.style.borderWidth='5px'
    confirmPasswordInput.style.borderWidth='5px'
  
    const validatePasswords = () => {
        passwordSchema.validate(passwordInput.value).then(() => {
          if (confirmPasswordInput.value === passwordInput.value) {
            passwordInput.setCustomValidity("");
            confirmPasswordInput.setCustomValidity("");
            passwordInput.style.borderColor = 'green';
            confirmPasswordInput.style.borderColor = 'green';
          } else {
            confirmPasswordInput.setCustomValidity("Passwords do not match");
            passwordInput.style.borderColor = '';
            confirmPasswordInput.style.borderColor = '';
          }
        }).catch((err) => {
          passwordInput.setCustomValidity(err.errors[0]);
          passwordInput.style.borderColor = '';
          confirmPasswordInput.style.borderColor = '';
        });
      };
    
      passwordInput.oninput = validatePasswords;
      confirmPasswordInput.oninput = validatePasswords;
  }