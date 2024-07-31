import { AdminNav } from "./adminNav.loader";

export class ManageStaff {
    static async load(){
      AdminNav.setAdminNav();
      const response = await fetch("src/views/pages/manageStaff.html");
      return response.text();
    };
  
    static initEventListeners(){
        
    };
  }