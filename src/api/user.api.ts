import { user } from "../interfaces/user.interface";
import { handleApiError } from "../utils/handleApiError";
import { instance } from "./base";

export class UserApi {
    //get user profile
  static async getMyProfile() {
    try {
      const response = await instance.get("/users/self");
      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  }
  //update user profile
  static async updateMyProfile(data: user){
    try{
      const response = await instance.put("/users", data);
      return response.data;
    }catch(err){
      handleApiError(err);
    }
  }
  //delete user profile
  static async deleteMyProfile(){
    try{
        const response = await instance.delete("/users");
        return response.data;
    }catch(err){
      handleApiError(err);
    }
  }
  //get all users and filter by name
  static async getUsers(
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

      const response = await instance.get(`/users/?${params.toString()}`);

      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  }

  //delete user by id
  static async deleteUser(id: string){
    try{
      const response = await instance.delete(`/users/${id}`);
      return response.data;
    }catch(err){
      handleApiError(err);
    }
  }
}
