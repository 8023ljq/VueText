import axios from '../axios'

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