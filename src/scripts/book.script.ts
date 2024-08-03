import { BookApi } from "../api/book.api";

export class BookActions {
  static async init(id: string) {
    const notifyBtn = document.getElementById("notifyBtn") as HTMLButtonElement;
    const data = await BookApi.getBookById(id);
    this.updatePageContent(data);
    // Event listeners initiallization
    notifyBtn.addEventListener("click", this.handleNotifyMe);
  }

  static updatePageContent(data: any) {
    const notifyDiv = document.getElementById("notify-div") as HTMLDivElement;
    const accessToken = localStorage.getItem("accessToken") as string;
    const authors = Array.isArray(data.authors)
      ? data.authors.join(", ")
      : data.authors;
    const genres = Array.isArray(data.genres)
      ? data.genres.join(", ")
      : data.genres;
      
    // Update all the content
    (document.getElementById("book-cover") as HTMLImageElement).src =
      data.image_link;
    (document.getElementById("book-title") as HTMLHeadingElement).textContent =
      data.title;
    (document.getElementById("author-name") as HTMLSpanElement).textContent =
      authors;
    (document.getElementById("genre-name") as HTMLSpanElement).textContent =
      genres;
    (document.getElementById("isbn") as HTMLSpanElement).textContent =
      data.isbn;
    (document.getElementById("publish-date") as HTMLSpanElement).textContent =
      new Date(data.published_date).toLocaleDateString();
    (document.getElementById("rating") as HTMLSpanElement).textContent = `${data.rating}/5`;
    (document.getElementById("total-copies") as HTMLSpanElement).textContent = `${data.total_copies}`;
    (document.getElementById("available-copies") as HTMLSpanElement).textContent = `${data.available_copies}`;
    (document.getElementById("total-reviews") as HTMLSpanElement).textContent = `${data.total_reviews}`;

    if (data.available_copies == 0 && accessToken) {
      notifyDiv.classList.remove("hidden");
    }
  }
  
  static async handleNotifyMe(){

  }
}
