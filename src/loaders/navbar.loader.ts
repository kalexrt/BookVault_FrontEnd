export class NavBar{
    static load: () => Promise<string> = async () => {
        const response = await fetch("src/views/components/navbar.html");
        return response.text();
      };
    
      static initEventListeners: () => void = () => { 
      };

      static async setNavBar(){
        const header = await NavBar.load();
        const appHeader = document.getElementById("header") as HTMLHeadElement;
        appHeader.innerHTML = header;
      }
      static removeNavBar(){
        const appHeader = document.getElementById("header") as HTMLHeadElement;
        appHeader.innerHTML = "";
      }
}