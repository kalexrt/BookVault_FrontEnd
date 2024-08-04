import { ReviewBookActions } from "../scripts/reviewBook.script";
import { NavBar } from "./navbar.loader";
export class ReviewBookPage {
  static async load(){
    NavBar.setNavBar();
    const response = await fetch("src/views/pages/reviewBooks.html");
    return response.text();
  };

  static initEventListeners(){
    ReviewBookActions.init();
  };
}