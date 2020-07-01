import { NuxtAxiosInstance } from "@nuxtjs/axios"

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  console.log(process.env.BASE_URL)
  axiosInstance.defaults.baseURL = process.env.BASE_URL
  $axios = axiosInstance
}

export { $axios }
