import { AdminNav } from "./adminNav.loader";

export class ManageBorrow {
    static async load(){
      AdminNav.setAdminNav();
      const response = await fetch("src/views/pages/manageBorrow.html");
      return response.text();
    };
  
    static initEventListeners(){
        
    };
  }