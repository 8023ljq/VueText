<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.Sort" >
    <template slot="title">
      <i :class="menu.IconUrl" ></i>
      <span slot="title" class="title">{{menu.FullName}}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.Sort" :menu="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="'' + menu.Sort" @click="handleRoute(menu)">
    <i :class="menu.IconUrl"></i>
    <span slot="title" class="title">{{menu.FullName}}</span>
  </el-menu-item>
</template>

<script>
import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute (menu) {
    // 如果是嵌套页面，转换成iframe的path
      let path = getIFramePath(menu.AddressUrl)
      if(!path) {
        path = menu.AddressUrl
      }
      // 通过菜单URL跳转至指定路由
      this.$router.push("/" + path)
    },
  }
}
</script>

<style scoped lang="scss">
.title{
  margin: 10px !important;
}
</style>
