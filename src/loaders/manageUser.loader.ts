import { AdminNav } from "./adminNav.loader";

export class ManageUser {
    static async load(){
      AdminNav.setAdminNav();
      const response = await fetch("src/views/pages/manageUser.html");
      return response.text();
    };
  
    static initEventListeners(){
        
    };
  }