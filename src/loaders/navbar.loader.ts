import { NavBarActions } from "../scripts/navbar.script";

export class NavBar{
    static load: () => Promise<string> = async () => {
        const response = await fetch("src/views/components/navbar.html");
        return response.text();
      };
      
      //for initializing the event listeners
      static initEventListeners: () => void = () => { 
        NavBarActions.init();
      };

      //for setting the nav bar
      static async setNavBar(){
        const header = await NavBar.load();
        const appHeader = document.getElementById("header") as HTMLHeadElement;
        appHeader.innerHTML = header;
      }
      //for removing the navbar
      static removeNavBar(){
        const appHeader = document.getElementById("header") as HTMLHeadElement;
        appHeader.innerHTML = "";
      }
}