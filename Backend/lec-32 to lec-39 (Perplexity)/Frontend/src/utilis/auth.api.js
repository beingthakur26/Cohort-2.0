import api from "../api/api.js";


export async function register({ fullName, email, username, password }) {
    const response = await api.post("/api/auth/register", { fullName, email, username, password })
    return response.data
}

export async function login({ email, password }) {
    const response = await api.post("/api/auth/login", { email, password })
    return response.data
}

export async function getMe() {
    const response = await api.get("/api/auth/me")
    return response.data
}