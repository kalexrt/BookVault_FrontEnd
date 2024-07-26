export function togglePassword(
  inputId: string,
  button: HTMLButtonElement
): void {
  const input = document.getElementById(inputId) as HTMLInputElement;
  const isPasswordType = input.type === "password";
  input.type = isPasswordType ? "text" : "password";

  // Change the eye icon based on password visibility
  if (isPasswordType) {
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825a9 9 0 01-7.2-3.3A9 9 0 015.1 7.5M4.22 4.22l15.56 15.56" />
        </svg>
      `;
  } else {
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-2.83-4.24a3 3 0 00-4.24 0M12 6a9 9 0 018.485 5.5A9 9 0 0112 18a9 9 0 01-8.485-5.5A9 9 0 0112 6z" />
        </svg>
      `;
  }
}
