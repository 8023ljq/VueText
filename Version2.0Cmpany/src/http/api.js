/*
 * 接口统一集成模块
 */
import * as login from './modules/login'
import * as common from './modules/common'
import * as manager from './modules/manager'

// 默认全部导出
export default {
  login,
  common,
  manager
}
