import { HomeActions } from "../scripts/home.script";
import { NavBar } from "./navbar.loader";
export class HomePage {
  static async load(){
    NavBar.setNavBar();
    const response = await fetch("src/views/pages/home.html");
    return response.text();
  };

  static initEventListeners(){
    HomeActions.init();
  };
}
