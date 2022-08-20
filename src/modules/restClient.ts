import axios, { AxiosInstance } from "axios";

export const bearer = "010c6d4ccaab278c0ecd92d30a7b0d";
export const basePath = "https://pagesource.de:443"

const apiClient: AxiosInstance = axios.create({
    baseURL: basePath+"/cockpit_0_9_3/api",
    headers: {
        "Authorization": "Bearer "+bearer,
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control":"no-cache",
        "Pragma" :  "",
    }
});
export default apiClient;