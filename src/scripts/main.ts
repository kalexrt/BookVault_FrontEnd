import { Router } from "../router";

document.addEventListener("DOMContentLoaded", async () => {


  Router.init();
  window.addEventListener("hashchange", () => Router.loadContent());
});
