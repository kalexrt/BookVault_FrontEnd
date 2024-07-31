import { handleApiError } from "../utils/handleApiError";
import { instance } from "./base";

export class StaffApi{
    //get all users and filter by name
  static async getStaffs(
    page: number = 1,
    size: number = 10,
    filters: {
      q?: string;
    } = {}
  ) {
    try {
      // create a new urlsearchparams object for query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      // add filter parameters to the query string if they exist
      if (filters.q) params.append("q", filters.q);

      const response = await instance.get(`/librarian/?${params.toString()}`);

      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  }
}