import { NuxtAxiosInstance } from "@nuxtjs/axios"

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  console.log(process.env.baseUrl)
  axiosInstance.defaults.baseURL = process.env.baseUrl
  // "http://ec2-13-209-30-24.ap-northeast-2.compute.amazonaws.com:8080"
  $axios = axiosInstance
}

export { $axios }
