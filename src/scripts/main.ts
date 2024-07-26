import { Router } from "../router";
import "../styles/style.css";
import { NavBar } from "../loaders/navbar.loader";

document.addEventListener("DOMContentLoaded", async () => {
  const header = await NavBar.load();
  const appHeader = document.getElementById("header") as HTMLHeadElement;
  appHeader.innerHTML = header;
  Router.init();
  window.addEventListener("hashchange", () => Router.loadContent());
});
