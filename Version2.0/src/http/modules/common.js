import axios from '../axios'

// 查找导航菜单树
export const findNavTree = (params) => {
  return axios({
    url: '/menu/findNavTree',
    method: 'get',
    params
  })
}

// 查找导航菜单树
export const findMenuTree = () => {
  return axios({
    url: 'common/getmenulist',
    method: 'get'
  })
}
