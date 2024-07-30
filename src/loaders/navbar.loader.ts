import { NavBarActions } from "../scripts/navbar.script";

export class NavBar{
    static async load(){
        const response = await fetch("src/views/components/navbar.html");
        return response.text();
      };

      //for setting the nav bar
      static async setNavBar(){
        const header = await NavBar.load();
        const appHeader = document.getElementById("header") as HTMLHeadElement;
        appHeader.innerHTML = header;
        //initialize the event listeners
        NavBarActions.init();
        NavBarActions.updateNavbarForLoggedInUser();
      }
      //for removing the navbar
      static removeNavBar(){
        const appHeader = document.getElementById("header") as HTMLHeadElement;
        appHeader.innerHTML = "";
      }
}