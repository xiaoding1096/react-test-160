import axios from "./axios.customize"

export const loginApi = (username: string, password: string) => {
    const urlBackEnd = '/api/v1/auth/login'
    const data = {
        username: username,
        password: password,
    }
    return axios.post<IBackendRes<ILogin>>(urlBackEnd, data)
}
