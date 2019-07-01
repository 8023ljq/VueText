import axios from '../axios'

export const getmanagerList=data=>{
    return axios({
        url: 'manager/getmanagerlist',
        method: 'get'
    })
}