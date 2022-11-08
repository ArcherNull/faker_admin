/*
 * @Author: Null
 * @Date: 2022-03-11 11:46:40
 * @Description: axios请求封装
 */

import server from './index'
import Qs from 'qs'

/*
Content-Type的类型如下：
常见的媒体格式类型如下：
text/html ： HTML格式
text/plain ：纯文本格式
text/xml ： XML格式
image/gif ：gif图片格式
image/jpeg ：jpg图片格式
image/png：png图片格式

以application开头的媒体格式类型：
application/xhtml+xml ：XHTML格式
application/xml ： XML数据格式
application/atom+xml ：Atom XML聚合格式
application/json ： JSON数据格式
application/pdf ：pdf格式
application/msword ： Word文档格式
application/octet-stream ： 二进制流数据（如常见的文件下载）
application/x-www-form-urlencoded ： 中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
*/

// 功能需求为 是否携带token
// 请求方法有 get / post / delete / put
/* 1）queryString参数 ，需设置
       method: 'get',
       params: query

    2）json参数
       method: 'post',
       data:data,

    3) json参数
       method: 'put',
       data:data,

    4）formData 表单
       method: 'post',
       data:data,
       headers: { 'Content-Type': 'multipart/form-data' }
 */

/**
 * @description:拼装请求体
 * @param { Object|String } paramsConfig 请求体配置
 * @return {*}
 */
function requestParams (paramsConfig) {
  if (paramsConfig) {
    let config = {}
    if (typeof paramsConfig === 'string') {
      config = paramsConfig
    } else {
      config = {
        ...config,
        ...paramsConfig
      }
    }
  }
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    server
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    server
      .post(url, Qs.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
   * delete方法，对应delete请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
export function del (url, params) {
  return new Promise((resolve, reject) => {
    server
      .delete(url + `/${params}`)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
   * put方法，对应put请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
export function put (url, params) {
  return new Promise((resolve, reject) => {
    server
      .put(url + `/${params}`)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

// 请求集成
const http = {
  get,
  post,
  del,
  put
}

export default http
