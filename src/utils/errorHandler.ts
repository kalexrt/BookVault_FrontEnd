export function displayResponseErrors(error: string) {
    const errorContainer = document.getElementById(
      "error-container"
    ) as HTMLDivElement;
    errorContainer.innerHTML = "";
  
    const errorElement = document.createElement("p");
    errorElement.textContent = error;
    errorElement.style.textAlign = "center";
    errorElement.style.color = "red";
    errorContainer.appendChild(errorElement);
  }