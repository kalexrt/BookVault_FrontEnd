import { LoginActions } from "../scripts/login.script";

export class LoginPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/login.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    LoginActions.init();
  };
}
