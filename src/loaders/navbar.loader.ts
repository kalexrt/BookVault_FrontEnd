export class NavBar{
    static load: () => Promise<string> = async () => {
        const response = await fetch("src/views/components/navbar.html");
        return response.text();
      };
    
      static initEventListeners: () => void = () => {
      };
}