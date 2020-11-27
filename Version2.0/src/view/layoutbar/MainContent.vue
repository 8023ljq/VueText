<template>
  <div id="main-container"
       class="main-container"
       :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
    <!-- 标签页 -->
    <div class="tab-container">
      <el-tabs class="tabs"
               :class="$store.state.app.collapse?'position-collapse-left':'position-left'"
               v-model="mainTabsActiveName"
               type="card"
               @tab-click="selectedTabHandle"
               @tab-remove="removeTabHandle">
        <el-dropdown id="tabs-tools"
                     :show-timeout="0"
                     trigger="hover">
          <div style="font-size:20px;width:50px;"><i class="el-icon-arrow-down"></i></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tab-pane id="tabs-pane"
                     v-for="item in mainTabs"
                     :key="item.name"
                     :label="item.title"
                     :name="item.name"
                     :closable="item.name=='首页'?false:true">
          <span slot="label"><i :class="item.icon"></i> {{item.title}}</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
        <transition name="fade"
                    mode="out-in">
          <router-view>
          </router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    mainTabs: {
      get () { return this.$store.state.tab.mainTabs },
      set (val) { this.$store.commit('updateMainTabs', val) }
    },
    mainTabsActiveName: {
      get () { return this.$store.state.tab.mainTabsActiveName },
      set (val) { this.$store.commit('updateMainTabsActiveName', val) }
    }
  },
  methods: {
    // tabs, 选中tab
    selectedTabHandle (tab) {
      tab = this.mainTabs.filter(item => item.name === tab.name)
      if (tab.length >= 1) {
        this.$router.push({ name: tab[0].name })
      }
    },
    // tabs, 删除tab
    removeTabHandle (tabName) {
      debugger
      this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
      if (this.mainTabs.length >= 1) {
        // 当前选中tab被删除
        if (tabName === this.mainTabsActiveName) {
          this.$router.push({ name: this.mainTabs[this.mainTabs.length - 1].name }, () => {
            this.mainTabsActiveName = this.$route.name
          })
        }
      } else {
        this.$router.push("/")
      }
    },
    // tabs, 关闭当前
    tabsCloseCurrentHandle () {
      this.removeTabHandle(this.mainTabsActiveName)
    },
    // tabs, 关闭其它
    tabsCloseOtherHandle () {
      this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
    },
    // tabs, 关闭全部
    tabsCloseAllHandle () {
      this.mainTabs = []
      this.$router.push("/")
    },
    // tabs, 刷新当前
    tabsRefreshCurrentHandle () {
      var tempTabName = this.mainTabsActiveName1
      this.removeTabHandle(tempTabName)
      this.$nextTick(() => {
        this.$router.push({ name: tempTabName })
      })
    }
  }
}
</script>

<style lang="scss">
.main-container {
  //height: 100%;
  background-color: whitesmoke;
  height: calc(100% - 110px);
  overflow-x: hidden;
}
.tab-container {
  height: 40px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
}
.el-tabs__header {
  height: 40px;
  line-height: 40px;
  float: left !important;
}
.el-tabs__content {
  float: right !important;
}
.el-tabs__item {
  height: 30px !important;
  margin: 5px 2px 5px 2px;
  line-height: 30px !important;
  border: 1px #d8dce5 solid !important;
}
.el-tabs__item.is-active {
  color: #ffffff !important;
  background-color: #42b983 !important;
  font-weight: 600;
}
.el-dropdown-selfdefine :hover {
  cursor: pointer;
}
.el-tabs__header {
  height: 30px;
  line-height: 30px;
  margin: 0px;
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
.main-content {
  margin: 10px;
  padding: 10px;
  height: 100%;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none !important;
  line-height: 40px;
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
  height: 40px;
}
.el-tabs--card > .el-tabs__header {
  border: none !important;
}
</style>

