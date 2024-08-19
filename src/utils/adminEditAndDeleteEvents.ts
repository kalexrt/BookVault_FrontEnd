import { ActionHandler } from "../interfaces/actionHandler.interface";

let isListenerAdded = false;

export function manageDeleteAndEditEventListeners(
  actionHandler: ActionHandler
) {
  const handleEvent = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("delete-btn")) {
      actionHandler.handleDeleteButton(target);
    } else if (target.classList.contains("edit-btn")) {
      if (actionHandler.handleEditButton)
        actionHandler.handleEditButton(target);
    }
  };
  
  if (isListenerAdded) {
    document.removeEventListener("click", handleEvent);
    isListenerAdded = false;
  } 
  if(!isListenerAdded){
    document.addEventListener("click", handleEvent);
    isListenerAdded = true;
  }
}
