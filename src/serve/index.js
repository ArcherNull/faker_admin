/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: 封装axios请求对象得入口文件
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { get } from 'lodash'
// 加密
// import preEncryption from './preEncryption.js'
// // 解密
// import resDecrypt from './resDecrypt.js'

import { httpConfig, handleError } from './httpCommon'

const { isDevEnv, baseURL, textBaseUrl, timeout, headers } = httpConfig

const server = axios.create({
  timeout,
  headers,

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [
    function (data, headers) {
      // 对 data 进行任意转换处理
      console.log(
        "只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法对 data 进行任意转换处理",
        data
      )
      return data
    }
  ],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      // 对 data 进行任意转换处理
      console.log('transformResponse` 在传递给 then/catch 前，允许修改响应数据')
      return data
    }
  ],
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false // default
})

if (isDevEnv) {
  server.defaults.baseURL = textBaseUrl
} else {
  server.defaults.baseURL = baseURL
}

// 设置请求前拦截器
server.interceptors.request.use(
  (config) => {
    let token
    if (isDevEnv) {
      token = 'c8d83e01ac3e8ebd44dbb7e4b1f5d98a'
    } else {
      token = window.sessionStorage.getItem('token')
        ? window.sessionStorage.getItem('token')
        : ''
    }

    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 设置响应拦截器
server.interceptors.response.use(
  (response) => {
    const resData = response

    if (response.status === 200) {
      return resData
    } else if (response.status === 999) {
      return resData
    } else {
      Message.error(`${resData.msg}`)
    }
  },
  (error) => {
    const status = get(error, 'response.status')
    switch (status) {
      case 302:
        error.message = '接口重定向了'
        break
      case 400:
        error.message = '请求错误'
        break
      case 401:
        error.message = '您未登录，或者登录已经超时，请先登录'
        break
      case 403:
        error.message = '您没有权限,拒绝访问'
        break
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        error.message = '请求超时'
        break
      case 409:
        error.message = '系统已存在相同数据！'
        break
      case 500:
        error.message = '服务器内部错误'
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '服务暂时无法访问，请稍后再试'
        break
      case 505:
        error.message = 'HTTP版本不受支持'
        break
      default:
        break
    }
    if (error.message.includes('timeout')) error.message = '网络请求超时'
    if (error.message.includes('Network')) {
      error.message = window.navigator.onLine ? '服务端异常' : '您断网了'
    }

    handleError(error)
    // throw error
    return Promise.reject(error)
  }
)

export default server
