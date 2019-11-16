import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
    axiosInstance.defaults.baseURL="http://localhost:8080"
    $axios = axiosInstance
}

export { $axios }