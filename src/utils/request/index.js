// 封装一个axios请求，为请求头添加token
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api'
})

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    }
)


// 封装一个响应拦截器，添加错误处理

instance.interceptors.response.use(
    res => {
        return res
    },
    err => {
        console.log(err.response)
        if (err.response.data.message) {
            return Promise.reject(err.response.data.message)
        }
        return Promise.reject(err.message)
    }
)

export default instance
