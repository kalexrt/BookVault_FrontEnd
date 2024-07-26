export class HomePage {
    static load: () => Promise<string> = async () => {
      const response = await fetch("src/views/pages/home.html");
      return response.text();
    };
  
    static initEventListeners: () => void = () => {
        
    };
  }