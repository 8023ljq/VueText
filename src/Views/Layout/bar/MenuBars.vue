<template>
  <el-aside id="asideNav">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <div v-for="item in navTree" :key="item.id">
        <el-submenu v-if="item.children && item.children.length >= 1" :index="'' + item.id">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
          </template>
          <MenuTree
            v-for="item in item.children"
            :key="item.id"
            :menu="item"
          ></MenuTree>
        </el-submenu>
        <el-menu-item
          v-else
          :index="'' + menu.id"
          @click="handleRoute(menu)"
        >
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </el-menu-item>
      </div>
      <!-- <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
          <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu> -->
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MenuTree",
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      navTree: state => state.menu.navTree
    })
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

