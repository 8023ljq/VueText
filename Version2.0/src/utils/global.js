/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址
export const ApiUrl = 'http://localhost:51543/v1/api'
// export const baseUrl = 'http://localhost:8001'
// 系统数据备份还原服务器地址
export const ImgUrl = 'http://139.196.87.48:8002'
// export const backupBaseUrl = 'http://localhost:8002'
export default {
  ApiUrl,
  ImgUrl
}
