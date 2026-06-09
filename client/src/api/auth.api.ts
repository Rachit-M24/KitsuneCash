import api from "./axios";

export const register = async(credentials: { email: string; password: string; confirmPassword: string }) => {
    const result = await api.post("/auth/register", credentials);
    return result;
}
export const logIn = async (credentials: { email: string; password: string }) => {
     const result = await api.post("/auth/login", credentials);
     return result;
}

export const logOut = async () => {
    return await api.post("/auth/logout");
}