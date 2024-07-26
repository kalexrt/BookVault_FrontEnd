export class AboutUsPage {
    static load: () => Promise<string> = async () => {
      const response = await fetch("src/views/pages/aboutus.html");
      return response.text();
    };
  
    static initEventListeners: () => void = () => {
        
    };
  }
  