<template>
  <div id="app">
     <el-container v-if="$route.meta.keepAlive">
       <el-header>
          <HeadBar></HeadBar>
       </el-header>
      <el-container>
        <el-aside>
          <MenuBars></MenuBars>
        </el-aside>
         <!-- <MenuBars></MenuBars> -->
         <el-container>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
          <BottomBar></BottomBar>
        </el-footer>
        </el-container>
      </el-container>
    </el-container>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
 import HeadBar from './views/Layout/bar/HeadBar'
  import MenuBars from './views/Layout/bar/MenuBars'
  import BottomBar from './views/Layout/bar/BottomBar'

export default {
  name: 'App',
   components: {
      HeadBar,
      MenuBars,
      BottomBar
    },
    created () {
      this.$router.push('/index')
    }
}
</script>

<style>
body {
	margin: 0px;
	padding: 0px;
	font-family: Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,  SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
	width: 100%;
  height: 100%;
  overflow:hidden
}
.el-container{
  height: 100%;
}
.el-header, .el-footer {
    background-color: #23262E;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    width: auto !important;
    min-width: 200px;
    background-color: #393D49;
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow: hidden !important;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
