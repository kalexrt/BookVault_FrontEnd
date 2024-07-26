export function displayResponseErrors(error: string) {
    console.log("err in response ", error);
    const errorContainer = document.getElementById(
      "error-container"
    ) as HTMLDivElement;
    errorContainer.innerHTML = "";
    console.log("error container", errorContainer);
  
    const errorElement = document.createElement("p");
    errorElement.textContent = error;
    errorElement.style.textAlign = "center";
    errorContainer.appendChild(errorElement);
  }