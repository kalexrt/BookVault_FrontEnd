import { LoginActions } from "../scripts/login.script";
import { NavBar } from "./navbar.loader";
export class LoginPage {
  static load: () => Promise<string> = async () => {
    NavBar.removeNavBar();
    const response = await fetch("src/views/pages/login.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    LoginActions.init();
  };

}
