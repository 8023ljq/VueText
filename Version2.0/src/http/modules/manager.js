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

// 添加角色
export const addnewrole=(data)=>{
    return axios({
        url: 'managerrole/addnewrole',
        method:'post',
        data
    })
}

// 编辑角色获取当前角色信息
export const selectrolemodel=(data)=>{
    return axios({
        url: 'managerrole/selectrolemodel?roleId='+data,
        method:'get',
        data
    })
}


// 获取管理员组列表
export const getmanagergrouplist=(data)=>{
    return axios({
        url: 'managergroup/getmanagergrouplist',
        method:'post',
        data
    })
}

// 获取管理员组列表
export const getgroupselectlist=(data)=>{
    return axios({
        url: 'managergroup/getgroupselectlist',
        method:'get',
        data
    })
}

// 添加管理员组
export const addmanagergroup=(data)=>{
    return axios({
        url: 'managergroup/addmanagergroup',
        method:'post',
        data
    })
}

// 获取管理员组信息
export const getmanagergroup=(data)=>{
    return axios({
        url: 'managergroup/getmanagergroup?groupid='+ data,
        method:'get',
        data
    })
}

// 修改管理员组信息
export const updatemanagergroup=(data)=>{
    return axios({
        url: 'managergroup/updatemanagergroup',
        method: 'post',
        data
    })
}

// 删除管理员组信息
export const deletemanagergroup=(data)=>{
    return axios({
        url: 'managergroup/deletemanagergroup?groupid='+ data,
        method: 'get',
        data
    })
}
