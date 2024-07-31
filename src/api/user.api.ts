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
}
