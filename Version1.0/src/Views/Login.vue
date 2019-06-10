<template>
  <div id="login">
    <div class="loginConbox">
      <div class="header">
        <!-- <div class="logo">
        <img src="../../assets/logo.png">
        </div> -->
      </div>
      <div class="loginBox">
        <div class="loginCon">
          <!-- <p class="title">vue-xuadmin权限管理后台模板</p>
          <p class="title">前台: vue + element-ui</p> -->
          <el-card shadow="always" class="login-module" v-if="!Scancode">
            <div slot="header" class="clearfix formTitlt">
              <span>密码登录</span>
              <span class="titIconbox">
                <!-- 扫码登录 -->
                <!-- <i class="iconfont xu-saomadenglu2 fa-lg iconcolor"></i>
              <i class="iconfont xu-saomadenglu01 el-icon--right fa-lg pointer" @click="Scancode = !Scancode"></i> -->
              </span>
            </div>
            <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm">
              <el-form-item prop="UserName">
                <el-input type="text" prefix-icon="el-icon-user" v-model="loginForm.UserName" auto-complete="off" placeholder="6到16位数字或字母" minlength="6" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item prop="PassWord">
                <el-input type="password" prefix-icon="icon-mima" v-model="loginForm.PassWord" auto-complete="off" placeholder="8到16位数字,字母组合" minlength="8" maxlength="16"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" type="primary" @click.native.prevent="login('loginForm')" :loading="logining">登录</el-button>
              </el-form-item>
              <!-- <p class="smalltxt">
                <router-link class="a" to="#">忘记密码</router-link>
                <router-link class="a" to="#">忘记会员名</router-link>
                <router-link class="a" to="#">免费注册</router-link>
              </p> -->
            </el-form>
          </el-card>

          <el-card shadow="always" class="login-module" v-else>
            <div slot="header" class="clearfix formTitlt">
              <span>扫码登录</span>
              <span class="titIconbox">
                <!-- <i class="iconfont xu-mimadenglu1 fa-lg iconcolor"></i>
              <i class="iconfont xu-imagevector el-icon--right fa-lg pointer" @click="Scancode = !Scancode"></i> -->
              </span>
            </div>
            <div class="ewmbox">
              <div class="ewm">
                <img src="https://img.alicdn.com/tfscom/TB1ivYYyHvpK1RjSZFqwu3XUVXa.png">
              </div>
              <div class="ewmicon">
                <i class="iconfont xu-saomadenglu fa-2x iconcolor"></i>
                <p>打开 微信 扫一扫登录</p>
              </div>
              <p class="smalltxt">
                <router-link class="a" to="#">免费注册</router-link>
              </p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { CheckUserName } from "../http/validate.js";
import { close } from "fs";

export default {
  name: "Login",
  data() {
    return {
      logining: false,
      Scancode: false,
      loginForm: {
        UserName: "administrator",
        PassWord: "a123456789"
      },
      fieldRules: {
        UserName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur"
          },
          { validator: CheckUserName, trigger: "blur" }
        ],
        PassWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
        ]
      },
      checked: true
    };
  },
  methods: {
    login(formName) {
      var vm = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          let userInfo = {
            UserName: this.loginForm.UserName,
            PassWord: this.loginForm.PassWord
          };
          if (userInfo.UserName == "" || userInfo.PassWord == "") {
            this.$message.error("请将账号密码输入完整");
          } else {
            this.$api.login
              .login(userInfo)
              .then(res => {
                if (res.ResultCode != 200) {
                  this.$message.error(res.ResultMsgs);
                } else {
                  Cookies.set("token", res.ResultData.Token); // 放置token到Cookie
                  sessionStorage.setItem("user", JSON.stringify(res.ResultData.Data)); // 保存用户到本地会话
                  console.log("request:", res);
                  this.$message({
                    message: res.ResultData.Token,
                    type: "success"
                  });
                  this.$router.push("/"); // 登录成功，跳转到主页
                }
              })
              .catch(function (res) {
                vm.$message.error(res);
              });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  .loginConbox {
    background: #2d3a4b;
  }
  .header {
    height: 60px;
    position: relative;
    background: #2d3a4b;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
    .logo {
      margin-left: 30px;
      width: 500px;
      float: left;
      height: 40px;
      padding-top: 10px;
      img {
        height: 100%;
      }
    }
  }

  .loginBox {
    .iconcolor {
      color: #409eff;
    }

    padding: 74px 0 118px;

    .loginCon {
      width: 990px;
      margin: auto;
      position: relative;
      height: 388px;

      .el-card__header {
        border-bottom: 0px;
      }
      .title {
        font-size: 36px;
        font-weight: 600;
        color: #ffffff;
        width: 500px;
        float: left;
        margin-top: 0px;
        &:first-child {
          font-size: 34px;
          margin-top: 50px;
          margin-bottom: 30px;
        }
      }
      .login-module {
        width: 380px;
        height: 325px;
        margin-top: 60px;
        border: none;
        position: absolute;
        right: 0;

        .formTitlt {
          font-size: 18px;
          font-weight: 400;

          .titIconbox {
            float: right;

            .pointer {
              cursor: pointer;
            }
          }
        }

        .smalltxt {
          text-align: right;

          .a {
            text-decoration: none;
            color: #999999;
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }

      .el-form-item__content {
        margin-left: 0px !important;

        .subBtn {
          width: 100%;
          border-radius: 5px !important;
        }
      }
    }

    .el-input__inner,
    .el-button,
    .el-card,
    .el-message {
      border-radius: 0px !important;
    }

    .el-form-item__content .ico {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 999;
      width: 40px;
      height: 39px;
      text-align: center;
      border-right: 1px solid #ccc;
    }

    .ewmbox {
      width: 100%;
      height: 240px;
      margin-top: -25px;

      .ewm {
        width: 140px;
        height: 140px;
        margin: 20px auto;

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }

      .ewmicon {
        width: 140px;
        margin: 20px auto 0;

        .iconfont {
          float: left;
        }

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }
    }
  }
}
</style>
