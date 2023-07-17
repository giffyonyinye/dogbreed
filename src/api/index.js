import { baseUrl } from "@/config";
import axios from "axios";

export const getAllDogs = async () => {
    try {
        const data = await axios.get(`${baseUrl}/breed/bulldog/images`);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}