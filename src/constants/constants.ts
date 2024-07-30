import { user } from "../interfaces/user.interface";

const port = import.meta.env.PORT;

export const userProfileData:user[]=[];

export const baseURL = `http://localhost:${port}/`;
export const axiosDefaultTimeout = 5000;
export const baseHeader = { "X-Custom-Header": "foobar" };