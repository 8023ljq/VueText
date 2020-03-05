<template>
  <!-- <div class="container"> -->
<el-container>
  <el-aside width="200px" :class="$store.state.app.collapse?'shrink':'expand'" ><!-- 导航菜单栏 -->
      <nav-bar></nav-bar>
  </el-aside>
  <el-container>
    <el-header>
       <!-- 头部区域 -->
      <head-bar></head-bar>
    </el-header>
    <el-main>
       <!-- 主内容区域 -->
      <main-content ></main-content>
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
import * as signalR from '@aspnet/signalr'

export default {
  data(){
    return{
      widowsStyle:""
    }
  },
  mounted(){ 
    debugger
  const signal = new signalR.HubConnectionBuilder()//服务器地址
    .withUrl('http://localhost:51543', {})
    .build()
     signal.start().then(() => {
        console.log('连接');
    })
  },
  methods:{
    getclass(msg){
       debugger
       this.$message({ message: msg, type: 'error' })
      this.widowsStyle=msg
    }
  },
  components:{
      HeadBar,
      NavBar,
      MainContent,
      Breadcrumb
  },
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
 .expand{
   width: 200px !important;
 }
 .shrink{
  width: 50px !important;
}
//  .content{
//    min-height: calc(100vh);
//  }

</style>
