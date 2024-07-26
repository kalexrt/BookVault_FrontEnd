export class Toast {
  static showToast(message: string, type = "info", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Trigger reflow
    toast.offsetHeight;

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  }
}
