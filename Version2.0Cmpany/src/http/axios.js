import axios from 'axios'
import config from './config'
import router from '@/router'
import store from '@/store'
import Cookies from 'js-cookie'
import { MessageBox } from 'element-ui'

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
      timeout: config.timeout,
      transformResponse: [function (data) {
      }]
    })

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get('token')
        // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
        // console.log(store.state.loading)
        // console.log('准备发送请求...')
        // 2. 带上token
        if (token) {
          config.headers.token = token
        } else {
          // 重定向到登录页面
          router.push('/login')
          token = ''
        }
        // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === 'post') {
          if (config.data.prototype === FormData.prototype || config.url.endsWith('path') || config.url.endsWith('mark') || config.url.endsWith('patchs')) {

          } else {
            // config.data = qs.stringify(config.data)
            config.data = config.data
          }
        }
        return config
      },

      error => {
        debugger
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          // return service.request(originalRequest);// 再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data  // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data=JSON.parse(response.request.responseText)
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        // if (response.data === undefined) {
        //   data = JSON.parse(response.request.responseText)
        // } else {
        //   data = response.data
        // }

        // 根据返回的code值来做不同的处理
        switch (data.ResultCode) {
          case 500:
            MessageBox.alert('当前账号已掉线或在另一端登录', '登录超时', {
              type: 'warning',
              confirmButtonText: '跳转至登录页面',
              callback: action => {
                sessionStorage.removeItem("user")
                store.state.app.menuRouteLoaded=false
                router.push({path: '/login'})
              }
            })
            break
          case 0:
            store.commit('changeState')
          // console.log('登录成功')
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err

        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 405:
              err.message = `请求的资源不支持 http 方法“GET”。`
              MessageBox.alert(err.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    router.replace({
                        name: 'login',
                        query: {redirect: router.currentRoute.fullPath} //登录后再跳回此页面时要做的配置
                    })
                }
              })
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              MessageBox.alert('请先登录', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                   
                }
              })
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
          }
        }
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}