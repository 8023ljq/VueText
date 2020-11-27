<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1"
              :index="'' + menu.Id"
              background-color="#243344">
    <template slot="title">
      <i :class="menu.IconUrl"></i>
      <span slot="title"
            class="title">{{menu.FullName}}</span>
    </template>
    <MenuTree v-for="item in menu.children"
              :key="item.Id"
              :menu="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else
                :index="'' + menu.Id"
                @click="handleRoute(menu)"
                class="under-menu">
    <!--  -->
    <!-- <i :class="menu.IconUrl"></i> -->
    <i v-if="menu.ParentId==='0'"
       :class="menu.IconUrl"></i>
    <i v-else
       class="el-icon-s-operation"></i>
    <!-- <i class="el-icon-s-operation"></i> -->
    <span slot="title"
          class="title">{{menu.FullName}}</span>
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
      if (!path) {
        path = menu.AddressUrl
      }
      // 通过菜单URL跳转至指定路由
      this.$router.push("/" + path)
    },
  }
}
</script>

<style scoped lang="scss">
.title {
  color: #fff !important;
  margin: 10px !important;
}

.el-submenu__title i {
  color: #fff !important;
}
.el-menu-item i {
  color: #fff !important;
}
.el-submenu :hover {
  background-color: #121f2e !important;
}
.el-menu-item :hover {
  background-color: #121f2e !important;
}
// .is-active{
//   color: #fff !important;
//   background-color:#121f2e !important;
// }
.under-menu {
  background-color: #243344 !important;
}
.el-menu--inline .is-active {
  border-left: 2px solid #409eff;
  border-left-color: rgb(255, 208, 75) !important;
  background-color: #121f2e !important;
}
.el-menu--inline .is-active .title {
  color: rgb(255, 208, 75) !important;
}
.el-menu--inline .is-active .el-icon-s-operation
{
  color: rgb(255, 208, 75) !important;
}
.el-menu--vertical .is-active
{
  border-left: 2px solid #409eff;
  border-left-color: rgb(255, 208, 75) !important;
}
.el-menu--vertical .is-active .title {
  color: rgb(255, 208, 75) !important;
}
.el-menu--vertical .is-active .el-icon-s-operation
{
  color: rgb(255, 208, 75) !important;
}
</style>
