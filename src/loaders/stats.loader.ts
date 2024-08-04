import { StatsActions } from "../scripts/stats.script";
import { AdminNav } from "./adminNav.loader";

export class Stats {
    static async load(){
      AdminNav.setAdminNav();
      const response = await fetch("src/views/pages/stats.html");
      return response.text();
    };
  
    static initEventListeners(){
        StatsActions.init();
    };
  }