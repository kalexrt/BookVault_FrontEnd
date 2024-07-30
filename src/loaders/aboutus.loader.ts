import { NavBar } from "./navbar.loader";

export class AboutUsPage {
    static async load(){
      NavBar.setNavBar();
      const response = await fetch("src/views/pages/aboutus.html");
      return response.text();
    };
  
    static initEventListeners(){
        
    };
  }
  