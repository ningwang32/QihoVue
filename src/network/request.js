//import qs from 'qs'
import axios from 'axios'
// export function request (config) {
//   const instance = axios.create({
//     baseURL: 'http://27.223.18.246:11310/',
//     timeout: 5000
//   })

//   // 请求拦截器
//   instance.interceptors.request.use(config => {
//     return config
//   }, err => {
//     console.log(err)
//   })
//   // 响应拦截
//   instance.interceptors.response.use(res => {
//     return res.data
//   }, err => {
//     console.log(err)
//   })

//   return instance(config)
// }
import request from 'axios'
export const getsList = (current,size,page)=>{
  return request({
    url:'http://27.223.18.246:11310/js/usr/ptdt/s',
    method:'post',
    params:{
      current,size
    },
    data:page
  })
}