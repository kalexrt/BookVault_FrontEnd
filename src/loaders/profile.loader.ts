import { ProfileActions } from "../scripts/profile.script";
import { NavBar } from "./navbar.loader";
export class ProfilePage {
  static load: () => Promise<string> = async () => {
    NavBar.setNavBar();
    const response = await fetch("src/views/pages/profile.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {
    ProfileActions.init();
  };
}
