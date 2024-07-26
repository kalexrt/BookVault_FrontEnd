import { NavBar } from "./navbar.loader";
export class HomePage {
  static load: () => Promise<string> = async () => {
    NavBar.setNavBar();
    const response = await fetch("src/views/pages/home.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {};
}
