<template>
  <el-container class="container">
    <el-aside width="200px"
              :class="$store.state.app.collapse?'shrink':'expand'">
      <!-- 导航菜单栏 -->
      <nav-bar></nav-bar>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 头部区域 -->
        <head-bar></head-bar>
      </el-header>
      <!-- 主内容区域 -->
      <main-content></main-content>
      <!-- <el-main>
      </el-main> -->
    </el-container>
  </el-container>
</template>
<script>

import HeadBar from "./layoutbar/HeadBar"
import NavBar from "./layoutbar/NavBar"
import MainContent from "./layoutbar/MainContent"
import Breadcrumb from "./layoutbar/Breadcrumb"

export default {
  data () {
    return {
      widowsStyle: ""
    }
  },
  mounted () {
  },
  methods: {
    getclass (msg) {
      debugger
      this.$message({ message: msg, type: 'error' })
      this.widowsStyle = msg
    }
  },
  components: {
    HeadBar,
    NavBar,
    MainContent,
    Breadcrumb
  },
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  overflow-x: hidden;
  background-color: burlywood;
}
.expand {
  width: 200px !important;
  overflow-x: hidden;
}
.shrink {
  width: 65px !important;
  overflow-x: hidden;
}
//  .content{
//    min-height: calc(100vh);
//  }
</style>
