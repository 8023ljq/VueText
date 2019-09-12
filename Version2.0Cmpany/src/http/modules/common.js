import axios from '../axios'

// 查找导航菜单树
export const findNavTree = (params) => {
  return axios({
    url: 'menu/getmenulist',
    method: 'get',
    params
  })
}

//查询单个导航菜单
export const findNavModel = (params) => {
  return axios({
    url: 'menu/getmenumodel?Id='+ params,
    method: 'get',
    params
  })
}

// 查找导航菜单树
// export const findMenuTree = () => {
//   return axios({
//     url: 'common/getmenulist',
//     method: 'get'
//   })
// }
