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

export const fetchAccountApi = () => {
    const urlBackEnd = '/api/v1/auth/account'
    
    return axios.get<IBackendRes<IFetchAccount>>(urlBackEnd,
    //     {
    //     headers:{
    //         delay: 5000
    //     }
    // }
)
}

export const logoutApi = () => {
    const urlBackEnd = '/api/v1/auth/logout'
    return axios.post<IBackendRes<ILogin>>(urlBackEnd)
}

export const getUsersApi = (query: string) => {
    const urlBackEnd = `/api/v1/user?${query}`
    return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackEnd)
}

export const createUserApi = (fullName: string, password: string, email: string, phone: string) => {
    const urlBackEnd = `/api/v1/user`
    const data = {
        fullName: fullName,
        password: password,
        email: email,
        phone: phone,
    }
    return axios.post<IBackendRes<IRegister>>(urlBackEnd,data)
}