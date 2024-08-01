import { ActionHandler } from "../interfaces/actionHandler.interface";

let isListenerAdded = false;

export function manageDeleteAndEditEventListeners(actionHandler: ActionHandler) {
  const handleEvent = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("delete-btn")) {
      actionHandler.handleDeleteButton(target);
    } else if (target.classList.contains("edit-btn")) {
      actionHandler.handleEditButton(target);
    }
  };
  
  // If the listener is already added, don't add it again
  if (!isListenerAdded) {
    document.addEventListener("click", handleEvent);
    isListenerAdded = true;
  }
}
