import axios from '../axios'

// 获取管理员列表
export const getmanagerList=data=>{
    return axios({
        url: 'manager/getmanagerlist',
        method: 'post',
        data
    })
}

// 获取单个管理员信息
export const getmanagermodel= (params)=>{
    return axios({
        url: 'manager/getmanagermodel?mangaerId='+ params,
        method: 'get',
        params
    })
}

// 修改管理员信息
export const updatemanagermodel= (data)=>{
    return axios({
        url: 'manager/updatemanagerinfo',
        method: 'post',
        data
    })
}

// 添加管理员
export const addmanagermodel=(data)=>{
    return axios({
        url:'manager/addmanagerinfo',
        method:'post',
        data
    })
}

// 停用启用管理员
export const disorenamanager=(data)=>{
    return axios({
        url:'manager/disorenamanager?mangaerId='+ data,
        method:'get',
        data
    })
}

//获取角色下拉框
export const getroleselectlist = () => {
    return axios({
      url: 'managerrole/getroleselectlist',
      method: 'get'
    })
  }

// 获取管理角色列表
export const getmanagerrolelist=(data)=>{
    return axios({
        url: 'managerrole/getmanagerrolelist',
        method:'post',
        data
    })
}