import { postRequest } from "./baseConfig";

export const userLogin = async (username: string, password: string) => await postRequest("/auth", {username, password})