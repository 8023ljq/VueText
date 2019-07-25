import axios from '../axios'

// 登录
export const login = data => {
  return axios({
    url: 'login/loginact',
    method: 'post',
    data
  })
}

// 退出
export const logout = () => {
  return axios({
    url: 'login/logout',
    method: 'get'
  })
}
