import { LoginActions } from "../scripts/login.script";
import { NavBar } from "./navbar.loader";
export class LoginPage {
  static async load(){
    NavBar.removeNavBar();
    const response = await fetch("src/views/pages/login.html");
    return response.text();
  };

  static initEventListeners(){
    LoginActions.init();
  };

}
