import { manageBookActions } from "../scripts/manageBook.script";
import { AdminNav } from "./adminNav.loader";

export class ManageBook {
    static async load(){
      AdminNav.setAdminNav();
      const response = await fetch("src/views/pages/manageBook.html");
      return response.text();
    };
  
    static initEventListeners(){
        manageBookActions.init();
    };
  }
  