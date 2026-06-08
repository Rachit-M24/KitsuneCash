import api from "./axios";

export const register = (credentials: { email: string; password: string; confirmPassword: string }) => {
    return api.post("/auth/register", credentials);
}
export const logIn = (credentials: { email: string; password: string }) => {
     const result = api.post("/auth/login", credentials);
     return result;
}

export const logOut = () => {
    return api.post("/auth/logout");
}