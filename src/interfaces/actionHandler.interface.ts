export interface ActionHandler {
  handleDeleteButton(target: HTMLElement): void;
  handleEditButton?(target: HTMLElement): void;
}
