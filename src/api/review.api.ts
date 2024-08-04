import { handleApiError } from "../utils/handleApiError";
import { instance } from "./base";

export class ReviewApi {
  // make the api call to get books to review
  static async getReviewsOfUser() {
    try {
      const response = await instance.get(`/reviews`);
      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  }

  // make the api call to add a review
  static async addReview(data: { borrowId: string; rating: number }) {
    try {
      const response = await instance.post(`/reviews`, data);
      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  }
}
