<template>
  <div id="Login">
    <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <span class="tool-bar">
      </span>
      <h2 class="title" style="padding-left:22px;">系统登录</h2>
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
  mounted(){ 
    debugger
    var connection = $.hubConnection('localhost:60700');
    //如果前后端为同一个端口，可不填参数。如果前后端分离，这里参数为服务器端的URL
    var demoChatHubProxy = connection.createHubProxy('messageHub');
    // demoChatHub为后端定义，使用驼峰式命名，后端首字母必须大写
    // addMessageToList 为后端demoChatHub方法
    demoChatHubProxy.on('sendMessage', function(userName, message) {
        console.log(userName + ' ' + message);
    });  
    connection.start()
        .done(function(){ console.log('Now connected, connection ID=' + connection.id); })
        .fail(function(){ console.log('Could not connect'); });
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
            console.log(res)
            this.$message({ message: res.ResultMsgs, type: 'success' })
            // Cookies.set('token', res.ResultData.Token) // 放置token到Cookie
            // sessionStorage.setItem('user', JSON.stringify(res.ResultData.Data)) // 保存用户到本地会话
            // this.$router.push('/')// 登录成功，跳转到主页
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
  background-color: #2c3e50;
  overflow: hidden;
}

.login-container {
  -webkit-border-radius: 5px !important;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 12% auto;
  width: 18%;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 0px #cac6c6 !important;
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
