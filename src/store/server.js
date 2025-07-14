import axios from "axios";

const token = localStorage.getItem('token')

const fetchApi = axios.create({
    baseURL: 'https://quflearn-db.liara.run',
    headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`
    }
})

fetchApi.interceptors.request.use(
    (config) => {
        console.log('config : ', config)
        return config
    },
    (err) => {
        console.log('error : ', err)
        return Promise.reject(err)
    }
)

export default fetchApi