<template>
  <el-aside id="asideNav">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleopen"
      @close="handleclose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <div v-for="item in navTree" :key="item.id">
        <el-submenu v-if="item.LowerMenuList && item.LowerMenuList.length >= 1" :index="'' + item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <MenuTree
            v-for="item in item.LowerMenuList"
            :key="item.id"
          ></MenuTree>
        </el-submenu>
        <el-menu-item
          v-else
          :index="'' + item.id"
          @click="handleRoute(item)"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState } from "vuex";
 import store from '@/store'

export default {
  name: "MenuTree",
  props: {
   
  },
  data() {
    return {
       navTree: store.state.menu.navTree,
    };
  },
  methods: {
     
    handleopen() {
      console.log("handleopen");
    },
    handleclose() {
      console.log("handleclose");
    },
    handleselect(a, b) {
      console.log("handleselect");
    },
    // 路由操作处理
    handleRoute(route) {
      debugger
       console.log("navTree:", navTree);
      // tab标签页选中, 如果不存在则先添加
      var tab = this.mainTabs.filter(item => item.name === route.name)[0];
      if (!tab) {
        tab = {
          name: route.name,
          title: route.name,
          icon: route.meta.icon
        };
        this.mainTabs = this.mainTabs.concat(tab);
      }
      this.mainTabsActiveName = tab.name;
      // 切换标签页时同步更新高亮菜单
      if (this.$refs.navmenu != null) {
        this.$refs.navmenu.activeIndex = "" + route.meta.index;
        this.$refs.navmenu.initOpenedMenu();
      }
    }
  }
};
</script>

<style lang="scss">
#asideNav {
  width: auto !important;
  overflow: auto !important;
}
</style>

