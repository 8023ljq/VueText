import axios from '../axios'

// 连接服务器
export const connectionAct = data => {
    return axios({
      url: 'builder/connectionact',
      method: 'post',
      data
    })
  }

// 获取数据列表
export const getDateList = params => {
    return axios({
      url: 'builder/getdatelist',
      method: 'get',
      params
    })
  }

  // 测试
export const Text = data => {
  return axios({
    url: 'builder/text',
    method: 'post',
    data
  })
}
