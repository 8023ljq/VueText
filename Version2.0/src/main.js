// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import api from './http'
import router from './router'
import store from './store'
import i18n from './i18n'
import ElementUI from 'element-ui'
import '../src/assets/icon/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
import XLSX from 'xlsx'
import 'signalr'

Vue.config.productionTip = false

Vue.prototype.$axios=axios;
Vue.use(api)
Vue.use(ElementUI)
Vue.use(XLSX)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

//当路由进入前
router.beforeEach((to, from , next) => {
  // 每次切换页面时，调用进度条
 NProgress.start();
 // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next();
});
//当路由进入后：关闭进度条
router.afterEach(() => {  
 // 在即将进入新的页面组件前，关闭掉进度条
 NProgress.done()
})
