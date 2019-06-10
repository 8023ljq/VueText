import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Intro from '@/views/Intro/Intro'
import store from '@/store'
import api from '@/http/api'
import { getIFrameUrl, getIFramePath } from '@/utils/iframe'

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        { 
          path: '', 
          name: '系统介绍', 
          component: Intro,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        }
      ]
    },
    {
      path: '/index',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      },
      // children:[

      // ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound,
      meta: {
        keepAlive: true
      }
    }
  ]
})

//beforeEach全局路由守卫 beforeEnter是单个路由守卫
router.beforeEach((to, from, next)=> {
  //登录成功之后,把用户信息保存在会话
  //存在时间为会话生命周期,页面关闭即失效
  let user=sessionStorage.getItem('user');
  if(to.path=='/login'){
   
  //用户访问登录页时,检查用户会话信息是否存在,存在即进主页,不存在就回到登录页
   if(user){
     next({path:'/'})
   }else{
     next()
   }
  }else{
    //如果用户进的不是登录页,检查用户会话是否存在,
    if(!user){
      next({path:'/login'})
    }else{
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(user.AdminName, to, from)
      next()
    }
  }
})

/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes(userName, to, from) {
  // 处理IFrame嵌套页面
  //handleIFrameUrl(to.path)
  
  if(store.state.data.menuRouteLoaded) {
    console.log(router)
    console.log('动态菜单和路由已经存在.')
    return
  }
  api.common.findMenuTree({'userName':userName})
  .then(res => {
    // 添加动态路由
    let dynamicRoutes = addDynamicRoutes(res.ResultData.data)
    // 处理静态组件绑定路由 
    handleStaticComponent(router, dynamicRoutes)
    debugger
    var a=router.options.routes
    router.addRoutes(router.options.routes)
    //router.addRoutes(dynamicRoutes)
   
    // 保存加载状态
    debugger
    store.commit('menuRouteLoaded', true)
    // 保存菜单树
    store.commit('setNavTree', res.ResultData.data)
  }).catch(function(res) {
  })
}


/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent(router, dynamicRoutes) {
  debugger
  for(let j=0;j<dynamicRoutes.length; j++) {
    if(dynamicRoutes[j].name == '代码生成') {
      dynamicRoutes[j].component = Generator
      break
    }
  }
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for(let i=0; i<length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if(path != null && path.endsWith(iframe.path)) {
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
  debugger
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].LowerMenuList && menuList[i].LowerMenuList.length >= 1) {
      temp = temp.concat(menuList[i].LowerMenuList)
    } else if (menuList[i].AddressUrl && /\S/.test(menuList[i].AddressUrl)) {
       menuList[i].AddressUrl = menuList[i].AddressUrl.replace(/^\//, '')
       // 创建路由配置
       var route = {
         path: menuList[i].AddressUrl,
         component: null,
         name: menuList[i].FullName,
         meta: {
           icon: menuList[i].IconUrl,
           index: menuList[i].Sort
         }
       }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
 }

export default router
