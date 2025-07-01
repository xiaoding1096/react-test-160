import axios from "./axios.customize"

export const loginApi = (username: string, password: string) => {
    const urlBackEnd = '/api/v1/auth/login'
    const data = {
        username: username,
        password: password,
    }
    return axios.post<IBackendRes<ILogin>>(urlBackEnd, data)
}

export const registerApi = (fullName: string, email: string, password: string, phone: string) => {
    const urlBackEnd = '/api/v1/user/register'
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
    }
    return axios.post<IBackendRes<IRegister>>(urlBackEnd,data)
}