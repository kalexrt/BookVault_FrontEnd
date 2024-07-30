import { AboutUsPage } from "./loaders/aboutus.loader";
import { LoginPage } from "./loaders/login.loader";
import { RegisterPage } from "./loaders/register.loader";
import { HomePage } from "./loaders/home.loader";
import { ProfilePage } from "./loaders/profile.loader";
import { SearchPage } from "./loaders/search.loader";

const routes: { [key: string]: { component: any } } = {
  "#/login": { component: LoginPage },
  "#/about-us": { component: AboutUsPage },
  "#/register": { component: RegisterPage },
  '#/home': { component: HomePage },
  '#/my-profile': { component: ProfilePage },
  '#/search': {component: SearchPage},
};

export class Router {
  static async loadContent() {
    const hash = window.location.hash || "#/home";
    const route = routes[hash];
    if (route) {
      const content = await route.component.load();
      
      document.getElementById("app")!.innerHTML = content;

      route.component.initEventListeners();
    }
  }

  static handleRouteChange() {
    Router.loadContent();
  }
  static init() {
    window.addEventListener("popstate", () => this.handleRouteChange());
    this.handleRouteChange();
  }
}
