import { handleApiError } from "../utils/handleApiError";
import { instance } from "./base";

export class NotificationApi{
    static async getNotifications(){
        try{
            const response = await instance.get("/notifications");
            return response.data;
        }catch(err){
            handleApiError(err);
        }
    }
    static async markAsRead(id: string){
        try{
            const response = await instance.put(`/notifications/${id}`);
            return response.data;
        }catch(err){
            handleApiError(err);
        }
    }
}