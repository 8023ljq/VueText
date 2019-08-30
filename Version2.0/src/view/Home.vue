<template>
  <!-- <div class="container"> -->
<el-container>
  <el-aside><!-- 导航菜单栏 -->
      <nav-bar></nav-bar>
  </el-aside>
  <el-container>
    <el-header>
       <!-- 头部区域 -->
      <head-bar></head-bar>
    </el-header>
    <el-main>
       <!-- 主内容区域 -->
      <main-content></main-content>
    </el-main>
  </el-container>
</el-container>
  <!-- </div> -->
</template>
<script>

import HeadBar from "./layoutbar/HeadBar"
import NavBar from "./layoutbar/NavBar"
import MainContent from "./layoutbar/MainContent"
import Breadcrumb from "./layoutbar/Breadcrumb"

export default {
  components:{
      HeadBar,
      NavBar,
      MainContent,
      Breadcrumb
  }
}
</script>

<style scoped lang="scss">
  .container {
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(224, 234, 235, 0.1);
  }
 
  .el-aside:not(.el-menu--collapse) {
    width: 50px;
  }
</style>
