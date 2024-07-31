import { instance } from "./base";
import { user } from "../interfaces/user.interface";
import { handleApiError } from "../utils/handleApiError";
export class AuthApi {
  //login
  static async login(data: Pick<any, "email" | "password">){
    try {
      const response = await instance.post("/auth/login", data);
      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  }

  //register
  static async register(data: user){
    try {
      const response = await instance.post("/auth/register", data);
      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  }
};