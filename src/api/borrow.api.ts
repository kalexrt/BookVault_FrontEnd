import { borrow } from "../interfaces/borrow.interface";
import { handleApiError } from "../utils/handleApiError";
import { instance } from "./base";

export class BorrowApi {
  static async getBorrows(
    page: number = 1,
    size: number = 10,
    filters: {
      book?: string;
      user?: string;
    } = {}
  ) {
    try {
      // create a new urlsearchparams object for query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      // add filter parameters to the query string if they exist
      if (filters.book) params.append("book", filters.book);
      if (filters.user) params.append("user", filters.user);

      // make the api call with the constructed query string
      const response = await instance.get(`/borrows/?${params.toString()}`);
      // return the data from the response
      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  }

  // make the api call to return a book by id
  static async returnBook(id: string) {
    try {
      const response = await instance.put(`/borrows/${id}`);
      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  }

    // make the api call to issue a book
    static async issueBook(data:borrow) {
        try {
            const response = await instance.post(`/borrows`, data);
            return response.data;
        } catch (err) {
            handleApiError(err);
        }
    }
}
