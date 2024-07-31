import { handleApiError } from "../utils/handleApiError";
import { instance } from "./base";

export class BookApi {
  static async getBooks(
    page: number = 1,
    size: number = 10,
    filters: {
      title?: string;
      genre?: string;
      isbn?: string;
      author?: string;
    } = {}
  ) {
    try {
      // create a new urlsearchparams object for query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      // add filter parameters to the query string if they exist
      if (filters.title) params.append("title", filters.title);
      if (filters.genre) params.append("genre", filters.genre);
      if (filters.isbn) params.append("isbn", filters.isbn);
      if (filters.author) params.append("author", filters.author);

      // make the api call with the constructed query string
      const response = await instance.get(`/books/?${params.toString()}`);

      // return the data from the response
      return response.data;
    } catch (err) {
      // if an error occurs, pass it to the error handling function
      handleApiError(err);
    }
  }
}
