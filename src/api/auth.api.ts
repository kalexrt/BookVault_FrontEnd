import { instance } from "./base";
import { user } from "../interfaces/user.interface";
export class authApi {
  //login
  static async login(data: Pick<any, "email" | "password">){
    try {
      const response = await instance.post("/auth/login", data);
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = err as {
          response: { data: { message: string } };
        };
        console.log(
          "Error response data message:",
          errorResponse.response.data.message
        );
        throw new Error(errorResponse.response.data.message);
      }
      throw new Error("Unknown error occurred");
    }
  }

  //register
  static async register(data: user){
    try {
      const response = await instance.post("/auth/register", data);
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = err as {
          response: { data: { message: string } };
        };
        console.log(
          "Error response data message:",
          errorResponse.response.data.message
        );
        throw new Error(errorResponse.response.data.message);
      }
      throw new Error("Unknown error occurred");
    }
  }
};