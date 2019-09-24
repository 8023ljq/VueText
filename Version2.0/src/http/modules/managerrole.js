import axios from '../axios'

// 获取管理角色列表
export const getmanagerrolelist=(data)=>{
    return axios({
        url: 'managerrole/getmanagerrolelist',
        method:'post',
        data
    })
}

// 获取当前角色信息
export const selectrolemodel=(data)=>{
    return axios({
        url: 'managerrole/selectrolemodel?roleId='+data,
        method:'get',
        data
    })
}

// 添加角色信息
export const addnewrole=(data)=>{
    return axios({
        url: 'managerrole/addnewrole',
        method:'post',
        data
    })
}

// 修改当前角色信息
export const updatenowrole=(data)=>{
    return axios({
        url: 'managerrole/updatenowrole',
        method:'post',
        data
    })
}

// 修改当前角色权限信息
export const updatenowpurview=(data)=>{
    return axios({
        url: 'managerrole/updatenowpurview',
        method: 'post',
        data
    })
}

// 启用/停用当前角色信息
export const enableordisablerole=(data)=>{
    return axios({
        url: 'managerrole/enableordisablerole?roleId='+data,
        method:'get',
        data
    })
}

// 删除当前角色信息
export const deletenowrole=(data)=>{
    return axios({
        url: 'managerrole/deletenowrole?roleId='+data,
        method:'get',
        data
    })
}
