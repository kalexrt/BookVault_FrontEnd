import { user } from "../interfaces/user.interface";
import { instance } from "./base";

export class UserApi {
    //get user profile
  static async getMyProfile() {
    try {
      const response = await instance.get("/users/self");
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = err as {
          response: { data: { message: string } };
        };
        throw new Error(errorResponse.response.data.message);
      }
      throw new Error("Unknown error occurred");
    }
  }
  //update user profile
  static async updateMyProfile(data: user){

  }
  //delete user profile
  static async deleteMyProfile(){
    try{
        const response = await instance.delete("/users");
        return response.data;
    }catch(err){
        if (err instanceof Error) {
            throw err;
          }
          if (typeof err === "object" && err !== null && "response" in err) {
            const errorResponse = err as {
              response: { data: { message: string } };
            };
            throw new Error(errorResponse.response.data.message);
          }
          throw new Error("Unknown error occurred");
    }
  }
}
