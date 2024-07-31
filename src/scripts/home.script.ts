import { BookApi } from "../api/book.api";
import { Router } from "../router";

export class HomeActions{
    static init(){
        const searchBtn = document.getElementById("searchBtn")as HTMLButtonElement;
        const searchInput = document.getElementById("searchInput") as HTMLInputElement;

        searchInput.addEventListener("keydown", HomeActions.handleKeyDown);
        searchBtn.addEventListener("click", HomeActions.handleSearchCall);
    }

    static async handleSearchCall(){
        window.history.pushState({}, "", "/#/search");
        Router.loadContent();
    }

    static handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            HomeActions.handleSearchCall();
        }
    }
}