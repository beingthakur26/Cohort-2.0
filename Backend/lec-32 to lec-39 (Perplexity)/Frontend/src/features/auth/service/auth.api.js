import axios from 'axios'

const api = axios.create({
    baseURl: "http://localhost:3000",
    withCredentials: true
})

export const register = async ({email, name, password}) => {
    const response = await api.post("/api/auth/register", {email, name, password})
    return response.data
}

export const login = async ({email, password}) => {
    const response = await api.post("/api/auth/login", {email, password})
    return response.data
}

export const getme = async () => {
    const response = await api.post("/api/auth/getme")
    return response.data
}