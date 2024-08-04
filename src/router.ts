import { match } from "path-to-regexp";
import { AboutUsPage } from "./loaders/aboutus.loader";
import { LoginPage } from "./loaders/login.loader";
import { RegisterPage } from "./loaders/register.loader";
import { HomePage } from "./loaders/home.loader";
import { ProfilePage } from "./loaders/profile.loader";
import { SearchPage } from "./loaders/search.loader";
import { BookPage } from "./loaders/book.loader";
import { ManageStaff } from "./loaders/manageStaff.loader";
import { ManageBook } from "./loaders/manageBook.loader";
import { ManageBorrow } from "./loaders/manageBorrow.loader";
import { ManageUser } from "./loaders/manageUser.loader";
import { Route } from "./interfaces/route.interface";
import { Stats } from "./loaders/stats.loader";
import { ReviewBookPage } from "./loaders/reviewBook.loader";

const routes: Route[] = [
  { path: "#/login", component: LoginPage },
  { path: "#/about-us", component: AboutUsPage },
  { path: "#/register", component: RegisterPage },
  { path: "#/home", component: HomePage },
  { path: "#/my-profile", component: ProfilePage },
  { path: "#/search", component: SearchPage },
  { path: "#/book/:id", component: BookPage },
  { path: "#/manage-staff", component: ManageStaff },
  { path: "#/manage-book", component: ManageBook },
  { path: "#/manage-borrow", component: ManageBorrow },
  { path: "#/manage-user", component: ManageUser },
  { path: "#/stats", component: Stats },
  { path: "#/review-books", component: ReviewBookPage },
];

export class Router {
  static async loadContent() {
    const path = window.location.hash || "#/home";

    for (const route of routes) {
      const matchFunction = match(route.path, { decode: decodeURIComponent });
      const result = matchFunction(path);

      if (result) {
        // Load the component's content based on route parameters
        let content: string;
        if (Object.keys(result.params).length > 0) {
          content = await route.component.load(result.params);
        } else {
          content = await route.component.load();
        }

        // Insert the loaded content into the app's main container
        document.getElementById("app")!.innerHTML = content;

        // Initialize event listeners for the component
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
