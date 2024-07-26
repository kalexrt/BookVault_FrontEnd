import { instance } from "./base";

export const authApi = {
  login: async (data: Pick<any, "email" | "password">) => {
    try {
      const response = await instance.post("/auth/login", data);
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        console.error("login error message", err.message);
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
  },
};