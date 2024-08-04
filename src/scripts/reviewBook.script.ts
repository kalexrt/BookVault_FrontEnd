import { BookApi } from "../api/book.api";
import { ReviewApi } from "../api/review.api";
import { Toast } from "../utils/toast";

export class ReviewBookActions {
  private static isListenerAttached = false;
  static init() {
    const closePopup = document.getElementById("closePopup");
    ReviewBookActions.getPendingReviews();
    closePopup!.addEventListener("click", ReviewBookActions.closePopup);
  }
  static async getPendingReviews() {
    try {
      const data = await ReviewApi.getReviewsOfUser();
      this.renderReviews(data);
    } catch (err) {
      Toast.showToast("Error occurred while getting reviews", "error");
    }
  }
  static async renderReviews(reviews: { id: string; book_id: string }[]) {
    const reviewSection = document.getElementById("reviewSection");
    if (reviews.length === 0) return;
    const reviewPromises = reviews.map(
      async (review: { id: string; book_id: string }) => {
        const book = await BookApi.getBookById(review.book_id);
        return `
        <div class="bg-gray-50 rounded-md p-4 flex items-start space-x-4">
          <img src="${book.image_link || "book-cover-placeholder.jpg"}" alt="${
          book.title
        }" class="w-20 h-30 object-cover rounded-md">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900">${book.title}</h3>
            <p class="text-sm text-gray-600">${book.authors}</p>
            <div class="mt-2">
              <button class="rate-me px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full hover:bg-gray-300 hover:scale-110 transition duration-100" 
                    data-id="${review.id}">
              Rate Me
            </button>
            </div>
          </div>
        </div>
      `;
      }
    );
    const reviewsHTML = await Promise.all(reviewPromises);
    reviewSection!.innerHTML = reviewsHTML.join("");
    // Add event listener to rate book
    if (!this.isListenerAttached) {
      reviewSection!.addEventListener("click", this.handleRateBook);
      this.isListenerAttached = true;
    }
  }
  static async handleRateBook(event: Event) {
    const target = (event.target as Element).closest(
      ".rate-me"
    ) as HTMLElement | null;
    ReviewBookActions.openPopup();

    const rating = document.getElementById("rating") as HTMLInputElement;
    const submitBtn = document.getElementById("submitRating");

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        const id = target!.getAttribute("data-id");
        const ratingValue = rating.value;
        const data = { 
            borrowId: id!, 
            rating: parseInt(ratingValue),
        };
        try {
          ReviewApi.addReview(data);
          ReviewBookActions.getPendingReviews();
          ReviewBookActions.closePopup();
          Toast.showToast("Book Rated Successfully", "success");
        } catch (err) {
          Toast.showToast("Error occurred while rating book", "error");
        }
      });
    }
  }

  private static openPopup() {
    const popup = document.getElementById("ratingPopup");
    popup!.classList.remove("hidden");
    popup!.classList.add("flex");
  }
  private static closePopup() {
    const popup = document.getElementById("ratingPopup");
    popup!.classList.remove("flex");
    popup!.classList.add("hidden");
  }
}
