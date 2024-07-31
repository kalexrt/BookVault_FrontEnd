import { SearchActions } from "../scripts/search.script";
import { NavBar } from "./navbar.loader";
export class SearchPage {
  static async load(){
    NavBar.setNavBar();
    const response = await fetch("src/views/pages/search.html");
    return response.text();
  };

  static initEventListeners() {
    SearchActions.init();
  };
}