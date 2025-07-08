import axios from "axios";


const fetchApi = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Content-Type" : "application/json",
        Auth: '`Bearer ${token}`'
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