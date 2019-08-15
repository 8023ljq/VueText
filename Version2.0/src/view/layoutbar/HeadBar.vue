<template> 
  <div class="headbar" :style="{'background':themeColor}" 
    :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
    <!-- 导航收缩 -->
    <span class="hamburg">
      <ul role="menubar" class="el-menu-demo el-menu--horizontal el-menu" style="background-color: rgb(20, 136, 154);">
        <li role="menuitem" tabindex="0" class="el-menu-item" :style="{'background-color':themeColor}" style="color: #fff;background-color: rgb(20, 136, 154);" @click="onCollapse">
         <i v-if="isfold" class="icon-fold-hori" style="color: #fff;"></i>
         <i v-else class="icon-fold-erect" style="color: #fff;"></i>
        </li>
      </ul>
      <!-- <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" :active-text-color="themeColor" mode="horizontal">
        <el-menu-item class="icon-fold-hori" v-if="isfold" index="1" @click="onCollapse">
        </el-menu-item>
         <el-menu-item class="icon-fold-hori" v-else index="1" @click="onCollapse">
        </el-menu-item>
      </el-menu> -->
    </span>
    <!-- 导航菜单 -->
    <span class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" 
          :background-color="themeColor" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/')">
          <i class="icon-Home"></i>
        </el-menu-item>
      </el-menu>
    </span>
    <!-- 工具栏 -->
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor" :active-text-color="themeColor" mode="horizontal">
        <!-- 主题切换 -->
        <!-- <el-menu-item index="1">
          <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>
        </el-menu-item> -->
        <!-- 语言切换 -->
        <!-- <el-tooltip class="item" effect="dark" content="切换语言" placement="bottom">
        <el-menu-item index="2" v-popover:popover-lang>
          <li style="color:#fff;" class="icon-Language"></li>
          <el-popover ref="popover-lang" placement="bottom-start" trigger="click" v-model="langVisible">
            <div class="lang-item" @click="changeLanguage('zh_cn')">{{$t("common.Chinese")}}</div>
            <div class="lang-item" @click="changeLanguage('en_us')">{{$t("common.English")}}</div>
          </el-popover>
        </el-menu-item>
        </el-tooltip> -->
        <!-- 我的私信 -->
        <!-- <el-menu-item index="3" v-popover:popover-message>
          <el-badge :value="5" :max="99" class="badge" type="success">
            <li style="color:#fff; font-size: 25px;" class="icon-xiaoxi"></li>
          </el-badge>
          <el-popover ref="popover-message" placement="bottom-end" trigger="click">
            
          </el-popover>
        </el-menu-item> -->
        <!-- 系统通知 -->
        <!-- <el-menu-item index="4" v-popover:popover-notice>
          <el-badge :value="4" :max="99" class="badge" type="success">
            <li style="color:#fff; font-size: 25px;" class="icon-tongzhi"></li>
          </el-badge>
          <el-popover ref="popover-notice" placement="bottom-end" trigger="click">
            
          </el-popover>
        </el-menu-item> -->
        <!-- 用户信息 -->
        <el-menu-item index="5" v-popover:popover-personal>
          <span class="user-info"><img :src="user.avatar" />{{user.name}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PersonalPanel from "../core/PersonalPanel"
import { ImgUrl } from '@/utils/global'

export default {
  components:{
    PersonalPanel
  },
  data() {
    return {
      user: {
        name: "Login.....",
        avatar: "@/assets/logo.png",
        role: "超级管理员",
        registeTime: "2018-12-25"
      },
      activeIndex: '1',
      langVisible: false,
      isfold: true,
    }
  },
  methods: {
    openWindow(url) {
      window.open(url)
    },
    selectNavBar(key, keyPath) {
      //console.log(key, keyPath)
    },
    // 折叠导航栏
    onCollapse: function() {
      this.isfold = !this.isfold;
      this.$store.commit('onCollapse')
    },
    // 切换主题
    onThemeChange: function(themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    },
    // 语言切换
    changeLanguage(lang) {
      lang === '' ? 'zh_cn' : lang
      this.$i18n.locale = lang
      this.langVisible = false
    }
  },
  mounted() {
    debugger
    var user = JSON.parse(sessionStorage.getItem("user"))
    if (user) {
      this.user.name = user.AdminName
      this.user.avatar =ImgUrl+ user.Avatar
      this.user.role = user.RoleName
      this.user.registeTime = user.RegisteTime
    }
  },
  computed:{
    ...mapState({
      themeColor: state=>state.app.themeColor,
      collapse: state=>state.app.collapse
    })
  }
}
</script>

<style scoped lang="scss">
.headbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
}
.hamburg, .navbar {
  float: left;
}
.toolbar {
  float: right;
}
.lang-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.lang-item:hover {
  font-size: 18px;
  // background:rgb(138, 136, 136);
  color: rgb(23, 136, 51);
}
.user-info {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
}
.badge {
  line-height: 18px;
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
.el-menu :hover{
  background-color:#243344 !important;
}

</style>
