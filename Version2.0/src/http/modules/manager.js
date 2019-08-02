import axios from '../axios'

export const getmanagerList=data=>{
    return axios({
        url: 'manager/getmanagerlist',
        method: 'post',
        data
    })
}

export const getmanagermodel= (params)=>{
    return axios({
        url: 'manager/getmanagermodel?mangaerId='+ params,
        method: 'get',
        params
    })
}
