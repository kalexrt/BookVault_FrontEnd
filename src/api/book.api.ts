import { book } from "../interfaces/book.interface";
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

  static async getBookById(id: string) {
    // make the api call to get a book by id
    try{
      const response = await instance.get(`/books/${id}`);
      return response.data;
    }catch(err){
      handleApiError(err);
    }
  }

  static async deleteBookById(id: string) {
    // make the api call to delete a book by id
    try{
      const response = await instance.delete(`/books/${id}`);
      return response.data;
    }catch(err){
      handleApiError(err);
    }
  }

  static async createBook(formData: FormData) {
    // make the api call to create a new book
    try{
      const response = await instance.post(`/books`, formData);
      return response.data;
    }catch(err){
      handleApiError(err);
    }
  }

  static async updateBook(id: string, book:book) {
    try{
      const response = await instance.put(`/books/${id}`, book);
      return response.data;
    }catch(err){
      handleApiError(err);
    }
  }
}
