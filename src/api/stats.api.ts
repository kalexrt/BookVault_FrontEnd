import { handleApiError } from "../utils/handleApiError";
import { instance } from "./base";

export class StatsApi{
    static async getStats(){
        try{
            const response = await instance.get("/stats");
            return response.data;
        }catch(err){
            handleApiError(err);
        }
    }
}