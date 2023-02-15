import axios from "axios";

export const baseURL = "http://192.168.2.4:8080"

export const api = axios.create({
    baseURL,
});