import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Login from '@/view/Login'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children:[
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    }
  ]
})

// beforeEach全局路由守卫 beforeEnter是单个路由守卫
router.beforeEach((to, from, next) => {
  // 保存加载状态
  store.commit('menuRouteLoaded', true)
  // 登录成功之后,把用户信息保存在会话
  // 存在时间为会话生命周期,页面关闭即失效
  let user = sessionStorage.getItem('user')
  if (to.path === '/login') {
    // 用户访问登录页时,检查用户会话信息是否存在,存在即进主页,不存在就回到登录页
    if (user) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 如果用户进的不是登录页,检查用户会话是否存在
    if (!user) {
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      next()
    }
  }
})

export default router
