import { RegisterActions } from "../scripts/register.script";

export class RegisterPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("src/views/pages/signup.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    RegisterActions.init();
  };
}
