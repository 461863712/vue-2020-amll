//分装网络请求
import axios from 'axios'

export function request(config) {
  //1创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/h8',
    // baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });
  //2请求拦截
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err)
  });
  //3响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  });
  // 4发送真正的网络请求
  return instance(config);//返回的是posmise
}
