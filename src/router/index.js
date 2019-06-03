import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Layout from '@/Views/Layout/Layout'
import store from '@/store'
import api from '@/http/api'

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/index',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
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
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout
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
    console.log('动态菜单和路由已经存在.')
    return
  }
  api.common.findMenuTree({'userName':userName})
  .then(res => {
    // 添加动态路由
    let dynamicRoutes = addDynamicRoutes(res.ResultData.data)
    // 处理静态组件绑定路由
    //handleStaticComponent(router, dynamicRoutes)
    debugger
    var asd=router.options.routes;
    router.addRoutes(router.options.routes)
    router.addRoutes(dynamicRoutes)
    // 保存加载状态
    store.commit('menuRouteLoaded', true)
    console.log('menuRouteLoaded',store.state.data.menuRouteLoaded)
    // 保存菜单树
    store.commit('setNavTree', res.ResultData.data)
  })
  // .then(res => {
  //   api.user.findPermissions({'name':userName}).then(res => {
  //     // 保存用户权限标识集合
  //     store.commit('setPerms', res.data)
  //   })
  // })
  .catch(function(res) {
  })
}


/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */




/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].LowerMenuList && menuList[i].LowerMenuList.length >= 1) {
      temp = temp.concat(menuList[i].LowerMenuList)
    } else if (menuList[i].AddressUrl && /\S/.test(menuList[i].AddressUrl)) {
       menuList[i].AddressUrl = menuList[i].AddressUrl.replace(/^\//, '')
       // 创建路由配置
       var route = {
         path: menuList[i].AddressUrl,
         component: "sys",
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
