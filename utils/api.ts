import { NuxtAxiosInstance } from "@nuxtjs/axios"

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  axiosInstance.defaults.baseURL = process.env.baseUrl
  $axios = axiosInstance
}

export { $axios }
