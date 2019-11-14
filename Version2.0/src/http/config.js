import { ApiUrl } from '@/utils/global'
import Cookies from 'js-cookie'

export default {
  method: 'post',
  // 基础url前缀
  baseURL: ApiUrl,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
     //'content-type' : 'application/x-www-form-urlencoded',
    'token': Cookies.get('token')
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 60000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}
