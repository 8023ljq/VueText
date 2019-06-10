<template>
  <el-submenu v-if="menuData.LowerMenuList && menuData.LowerMenuList.length >= 1" :index="'' + menuData.id">
    <template slot="title">
      <i :class="menuData.IconUrl" ></i>
      <span slot="title">{{menuData.FullName}}</span>
    </template>
    <MenuTree v-for="item in menuData.LowerMenuList" :key="item.id" :menuData="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="'' + menuData.id" @click="handleRoute(menuData)">
    <i :class="menuData.IconUrl"></i>
    <span slot="title">{{menuData.FullName}}</span>
  </el-menu-item>
</template>

<script>
import { getIFrameUrl, getIFramePath } from '@/utils/iframe'

  export default {
    name: 'MenuTree',
    props: {
    menuData: {
      type: Object,
      required: true
     }
    },
    methods: {
    handleRoute (item) {
      debugger
      // 如果是嵌套页面，转换成iframe的path
      let path = getIFramePath(item.AddressUrl)
      if(!path) {
        path = item.AddressUrl
      }
      // 通过菜单URL跳转至指定路由
      this.$router.push("/" + path)
    }
  }
}
</script>