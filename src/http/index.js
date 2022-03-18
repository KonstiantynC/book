import axios from 'axios'
import config from '@/config'
import store from "@/store"
import router from "@/router"
import { vuexTypes } from '@/store/types'

const $api = axios.create({
    withCredentials: true,
    baseURL: config.hostUrl
})

$api.interceptors.request.use((config) => {
    const accessToken = store.getters[vuexTypes.accessToken]

    config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.put(config.hostUrl + '/api/v1/auth/refresh', {}, {withCredentials: true})
            const data = response.data

            store.commit(vuexTypes.UPDATE_USER_AUTH, data)

            return $api.request(originalRequest)
        } catch (err) {
            store.commit(vuexTypes.CLEAR_STATE)
            router.push({name: 'sign-in'})
        }
    }

    throw error
})

export default $api
