import { NuxtAxiosInstance } from "@nuxtjs/axios"

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  axiosInstance.defaults.baseURL = "https://gondev.xyz"
  $axios = axiosInstance
}

export { $axios }
