import { StatsApi } from "../api/stats.api";

export class StatsActions{
    static init(){
        this.loadStatsData();
    }
    static async loadStatsData(){
        const statsData = await StatsApi.getStats();

        const totalBooks = document.getElementById("totalBooks") as HTMLElement;
        const totalUsers = document.getElementById("totalUsers") as HTMLElement;
        const totalIssuedBooks = document.getElementById("totalIssuedBooks") as HTMLElement;
        const totalReviews = document.getElementById("totalReviews") as HTMLElement;
        const mostPopularBook = document.getElementById("mostPopularBook") as HTMLElement;
        const mostReviewedBook = document.getElementById("mostReviewedBook") as HTMLElement;
        const mostActiveUser = document.getElementById("mostActiveUser") as HTMLElement;
        const mostWantedBook = document.getElementById("mostWantedBook") as HTMLElement;
        
        totalBooks.innerText = statsData.totalBooks.toString();
        totalUsers.innerText = statsData.totalUsers.toString();
        totalIssuedBooks.innerText = statsData.totalIssuedBooks.toString();
        totalReviews.innerText = statsData.totalReviews.toString();
        mostPopularBook.innerText = statsData.mostPopularBook;
        mostReviewedBook.innerText = statsData.mostReviewedBook;
        mostActiveUser.innerText = statsData.mostActiveUser;
        mostWantedBook.innerText = statsData.mostWantedBook;
    }
}