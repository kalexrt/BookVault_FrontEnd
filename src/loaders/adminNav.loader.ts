import { AdminNavActions } from "../scripts/adminNav.script";

export class AdminNav {
  static async load() {
    const response = await fetch("src/views/components/adminNav.html");
    return response.text();
  }

  // for setting the nav bar
  static async setAdminNav() {
    const header = await AdminNav.load();
    const appHeader = document.getElementById("header") as HTMLHeadElement;
    appHeader.innerHTML = header;
    // initialize the event listeners
    AdminNavActions.init();
    AdminNavActions.updateForRole();
  }
}
