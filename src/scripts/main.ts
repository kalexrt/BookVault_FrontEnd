import { Router } from "../router";
import '../styles/style.css';

document.addEventListener("DOMContentLoaded", async () => {

  Router.init();
  window.addEventListener("hashchange", () => Router.loadContent());
});
