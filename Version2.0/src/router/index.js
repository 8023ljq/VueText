import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Login from '@/view/Login'
import NewLogin from '@/view/NewLogin'
import Register from '@/view/Register'
import store from '@/store'
import api from '@/http/api'
import lord from '@/view/lord/lord'
import Homepage from '@/view/lord/Homepage'
import text from '@/view/sys/text'
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {
          path: '',
          name: '首页',
          component: Homepage,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        },
        {
          path: '/sys/text/:id',
          component: () => import('@/view/sys/text'),
          name: 'EditArticle',
          meta: { title: 'Edit Article', noCache: true, activeMenu: '/sys/text' },
          hidden: true
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: NewLogin
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
  ]
})



// beforeEach全局路由守卫 beforeEnter是单个路由守卫
router.beforeEach((to, from, next) => {
  // 登录成功之后,把用户信息保存在会话
  // 存在时间为会话生命周期,页面关闭即失效
  // let user = sessionStorage.getItem('user')
  // if (to.path === '/login') {
  //   // 用户访问登录页时,检查用户会话信息是否存在,存在即进主页,不存在就回到登录页
  //   if (user) {
  //     next({ path: '/' })
  //   } else {
  //     next()
  //   }
  // } else {
  //   // 如果用户进的不是登录页,检查用户会话是否存在
  //   if (!user) {
  //     next({ path: '/login' })
  //   } else {
  //     // 加载动态菜单和路由
  //     addDynamicMenuAndRoutes(user.UserId, to, from)
  //     next()
  //   }
  // }
  let token = Cookies.get('token')
  if (to.path === '/login' || to.path === '/register') {
    // 用户访问登录页时,检查用户会话信息是否存在,存在即进主页,不存在就回到登录页
    if (token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 如果用户进的不是登录页,检查用户会话是否存在
    if (!token) {
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      var menuRouteLoaded = store.state.app.menuRouteLoaded;
      if (!menuRouteLoaded) {
        addDynamicMenuAndRoutes('', to, from)
      }
      next()
    }
  }
})

/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes (UserId, to, from) {
  // 处理IFrame嵌套页面
  handleIFrameUrl(to.path)
  if (store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }
  else {
    api.common.findNavTree({ 'UserId': UserId })
      .then(res => {
        if (res.ResultCode == 200) {
          // 添加动态路由
          let dynamicRoutes = addDynamicRoutes(res.ResultData.data)
          // 处理静态组件绑定路由
          handleStaticComponent(router, dynamicRoutes)
          //动态加载路由
          router.addRoutes(router.options.routes)
          // 保存加载状态
          store.commit('menuRouteLoaded', true)
          //store.state.app.menuRouteLoaded=true
          // 保存菜单树
          store.commit('setNavTree', res.ResultData.data)
          console.log('菜单和路由加载状态:' + store.state.app.menuRouteLoaded)
        }
      })
      .catch(function (res) {
      })
  }
}

/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent (router, dynamicRoutes) {
  // for(let j=0;j<dynamicRoutes.length; j++) {
  //   if(dynamicRoutes[j].name == '代码生成') {
  //     dynamicRoutes[j].component = Generator
  //     break
  //   }
  // }
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
  //console.log(router)
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl (path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for (let i = 0; i < length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if (path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].AddressUrl && /\S/.test(menuList[i].AddressUrl)) {
      menuList[i].AddressUrl = menuList[i].AddressUrl.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].AddressUrl,
        component: null,
        name: menuList[i].FullName,
        meta: {
          icon: menuList[i].IconUrl,
          index: menuList[i].Id
        }
      }
      let path = getIFramePath(menuList[i].AddressUrl)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        route['component'] = resolve => require([`@/view/iframe/iframe`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].AddressUrl)
        let iFrameUrl = { 'path': path, 'url': url }
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
        try {

          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].AddressUrl.split('/')
          let url = ''
          for (let i = 0; i < array.length; i++) {
            //  url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
            url += array[i].substring(0, 1) + array[i].substring(1) + '/'
          }
          url = url.substring(0, url.length - 1)
          route['component'] = resolve => require([`@/view/${url}`], resolve)
        } catch (e) { }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    // console.log('动态路由加载...')
    // console.log(routes)
    // console.log('动态路由加载完成.')
  }
  return routes
}

export default router
