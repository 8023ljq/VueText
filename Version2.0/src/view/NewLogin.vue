<template>
  <div id="Login">
    <div id="LginTop">

    </div>
    <div id="LoginWindow">
      <div class="WindowLeft">
      </div>
      <div class="WindowRight">
        <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" class="Right_container">
          <header style="display: flex;justify-content: space-between;align-items: flex-end;">
            <h2 class="Right_title">登录</h2>
            <span class="Right_regis" style="font-size: 14px;padding-bottom: 20px;">没有账号? <a>点此注册</a></span>
          </header>
          <el-form-item prop="UserName">
            <el-input type="text" prefix-icon="icon-user" v-model="loginForm.UserName" auto-complete="off" placeholder="6到16位数字或字母" minlength="6" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item prop="PassWord">
            <el-input type="password" prefix-icon="icon-mima" v-model="loginForm.PassWord" auto-complete="off" placeholder="8到16位数字,字母组合" minlength="6" maxlength="16"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <!-- <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button> -->
            <el-button type="primary" style="width:100%;" @click.native.prevent="login('loginForm')" :loading="loading">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="LginBottom">

    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { debug } from 'util';

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      loginForm: {
        UserName: 'administrator',
        PassWord: 'a123456789'
      },
      fieldRules: {
        UserName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个,数字字母组合', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个,数字字母组合', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.loading = true
      // this.$message({ message:this.loginForm, type: 'success' })
      if (this.loginForm.UserName === '' ||this.loginForm.PassWord=== '') {
        this.$message.error({ message: '请将账号密码输入完整', type: 'error' })
      }
      else {
        this.$api.login.login(this.loginForm).then((res) => {
          if (res.ResultCode !== 200) {
            this.$message({ message: res.ResultMsgs, type: 'error' })
          }
          else {
            this.$message({ message: res.ResultMsgs, type: 'success' })
            Cookies.set('token', res.ResultData.Token) // 放置token到Cookie
            sessionStorage.setItem('user', JSON.stringify(res.ResultData.Data)) // 保存用户到本地会话
            this.$router.push('/')// 登录成功，跳转到主页
          }
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#Login {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #fff;
  overflow: hidden;
  display:table;
}
#LginTop{
  width: 100%;
  height: 12%;
}
#LoginWindow{
  width: 50%;
  height: 70%;
  margin: auto;
  box-shadow: 0px 20px 80px 0px rgba(0,0,0,0.3);
  .WindowLeft{
   width:50%;
   height: 100%;
   float: left;
   background:#607089;
   //opacity:0.60;
   //background-image:url("../assets/jpg/timg.jpg") ;
   //background-repeat: no-repeat;
   //background-size: 100% auto;
  }
  .WindowRight{
    width:50%;
    height: 100%;
    float:right;
    .Right_container{
      height: 60%;
      padding: 50px;
    }
  }
}
#LginBottom{
  width: 100%;
  height: 18%;
}
</style>
