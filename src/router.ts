import { match } from "path-to-regexp";
import { AboutUsPage } from "./loaders/aboutus.loader";
import { LoginPage } from "./loaders/login.loader";
import { RegisterPage } from "./loaders/register.loader";
import { HomePage } from "./loaders/home.loader";
import { ProfilePage } from "./loaders/profile.loader";
import { SearchPage } from "./loaders/search.loader";
import { BookPage } from "./loaders/book.loader";

interface Route {
  path: string;
  component: {
    load: (params?: any) => Promise<string>;
    initEventListeners?: (params?: any) => void;
  };
}

const routes: Route[] = [
  { path: "#/login", component: LoginPage },
  { path: "#/about-us", component: AboutUsPage },
  { path: "#/register", component: RegisterPage },
  { path: "#/home", component: HomePage },
  { path: "#/my-profile", component: ProfilePage },
  { path: "#/search", component: SearchPage },
  { path: "#/book/:id", component: BookPage },
];

export class Router {
  static async loadContent() {
    const path = window.location.hash || "#/home";

    for (const route of routes) {
      const matchFunction = match(route.path, { decode: decodeURIComponent });
      const result = matchFunction(path);

      if (result) {
        let content: string;
        if (Object.keys(result.params).length > 0) {
          content = await route.component.load(result.params);
        } else {
          content = await route.component.load();
        }

        document.getElementById("app")!.innerHTML = content;

        if (Object.keys(result.params).length > 0) {
          route.component.initEventListeners!(result.params);
        } else {
          route.component.initEventListeners!();
        }

        break;
      }
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
