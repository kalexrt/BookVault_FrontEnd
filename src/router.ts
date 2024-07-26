import { AboutUsPage } from "./loaders/aboutus.loader";
import { LoginPage } from "./loaders/login.loader";
import { RegisterPage } from "./loaders/register.loader";

const routes: { [key: string]: { component: any } } = {
  "#/login": { component: LoginPage },
  "#/about-us": { component: AboutUsPage },
  "#/register": { component: RegisterPage },
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
