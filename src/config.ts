import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });
const defaultPort = 8080;

export const config = {
    port: process.env.PORT ? process.env.PORT : defaultPort,
}