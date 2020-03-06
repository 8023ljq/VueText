/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址
//export const ApiUrl = 'http://139.9.167.151:8018/api'
//export const ApiUrl = 'http://47.75.241.154:8012/api'
export const ApiUrl = 'http://localhost:60700/api'
// 系统数据备份还原服务器地址
export const ImgUrl = 'http://139.9.167.151:8018'
//图片上传接口地址
export const UploadFileUrl = 'http://localhost:51543/api/uploadfile/newuploadfile'
// export const UploadFileUrl = 'http://localhost:51543/api/uploadfile/newuploadfile'
//export const UploadFileUrl = 'http://47.75.241.154:8012/api/uploadfile/newuploadfile'

export default {
  ApiUrl,
  ImgUrl,
  UploadFileUrl
}
