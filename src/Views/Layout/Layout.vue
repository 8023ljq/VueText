<template>
  <div id="loyout">
    <el-container>
       <HeadBar></HeadBar>
      <el-container>
         <MenuBars></MenuBars>
        <el-main id="elmain">
          <transition name="main" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer>
          <BottomBar></BottomBar>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import HeadBar from './bar/HeadBar'
  import MenuBars from './bar/MenuBars'
  import BottomBar from './bar/BottomBar'

  export default {
    name: 'dc-home',
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
