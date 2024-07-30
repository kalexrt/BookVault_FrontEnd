import { RegisterActions } from "../scripts/register.script";
import { NavBar } from "./navbar.loader";

export class RegisterPage {
  static async load(){
    NavBar.removeNavBar();
    const response = await fetch("src/views/pages/register.html");
    return response.text();
  };

  static initEventListeners(){
    RegisterActions.init();
  };
}
