import { BookActions } from "../scripts/book.script";
import { NavBar } from "./navbar.loader";

export class BookPage {
  static async load() {
    NavBar.setNavBar();
    const response = await fetch("src/views/pages/book.html");
    return response.text();
  }
  static initEventListeners(param: any) {
    BookActions.init(param.id);
  }
}

