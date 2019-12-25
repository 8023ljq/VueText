import axios from '../axios'

// 添加菜单信息
export const addNewMenu = data => {
  return axios({
    url: 'menu/addmenuinfo',
    method: 'post',
    data
  })
}

// 删除菜单信息
export const deleteMenu = data =>{
  return axios({
    url: 'menu/deletemenu?guId='+data,
    method: 'get',
    data
  })
}

// 修改菜单信息
export const updateMenu = data =>{
  return axios({
    url: "menu/updatemenu",
    method: 'post',
    data
  })
}

// 查找导航菜单树(主路由控制)
export const findNavTree = (params) => {
  return axios({
    url: 'menu/getmenulist?userId='+ params,
    method: 'get',
    params
  })
}

//获取单个菜单信息
export const findNavModel = (params) => {
  return axios({
    url: 'menu/getmenumodel?guid='+ params,
    method: 'get',
    params
  })
}

// 添加菜单里按钮权限数据
export const addMenuPowerAct=data=>{
  return axios({
    url: 'menu/addmenupower',
    method: 'post',
    data
  })
}

// 删除按钮权限数据
export const deletePower =data =>{
  return axios({
    url: 'menu/deletemenupower?guid='+ data,
    method: 'get',
    data
  })
}

// 所有路由
export const findAllMenu = (params) => {
  return axios({
    url: 'menu/getallmenulist',
    method: 'get',
    params
  })
}

// 获取单个按钮信息
export const updatePower = data =>{
  return axios({
    url: 'menu/getmenupower?guid='+ data,
    method: 'get',
    data
  })
}

// 获取单个按钮信息
export const getmenuPower = data =>{
  return axios({
    url: 'menu/getmenupower?guid='+ data,
    method: 'get',
    data
  })
}

// 修改当前按钮信息
export const updatemenuPower = data =>{
  return axios({
    url: 'menu/updatemenupower',
    method: 'post',
    data
  })
}

// 修改当前按钮信息
export const testExport = data =>{
  return axios({
    url: 'text/exportdata',
    method: 'post',
    //responseType:'blob',
    data
  })
}

// 测试接口A
export const testA = params =>{
  return axios({
    url: 'common/apia',
    method: 'get',
    //responseType:'blob',
    params
  })
}

// 测试接口B
export const testB = params =>{
  return axios({
    url: 'common/apib',
    method: 'get',
    //responseType:'blob',
    params
  })
}

// 测试接口C
export const testC = params =>{
  return axios({
    url: 'common/apic',
    method: 'get',
    //responseType:'blob',
    params
  })
}
  // 测试接口C
export const getarr = data =>{
  return axios({
    url: 'test/getarr',
    method: 'post',
    data
  })
}