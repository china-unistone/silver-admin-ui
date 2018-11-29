<template>
<div class="login">
  <div class="login_leftbg"></div>
  <div class="login_box clearfix">
    <div class="login_logo"></div>
    <el-form :model="ruleForm">
      <div class="login_form">
        <div class="login_tips"><span></span></div>
        <div class="login_input">
          <label>用户名：</label>
          <el-input v-model="ruleForm.login" class="logInput"></el-input>
        </div>
        <div class="login_input">
          <label>密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
          <el-input type="password" class="logInput" v-model="ruleForm.password" autocomplete="off"></el-input>
        </div>
        <div class="login_submit_btn">
          <el-button type="primary" @click="onLogin()">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </div>
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
import '../assets/css/login.less'
import axios from 'axios'
import API from '../api/api'
import router from '../router'

export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        login: '',
        password: '',
      }
    }
  },
  methods: {
    onLogin() {
      var login = this.ruleForm.login
      var password = this.ruleForm.password
      if (login == '') {
        this.$message.error('请输入登录账号')
        return false
      }
      if (password == '') {
        this.$message.error('请输入登录密码')
        return false
      }
      //ajax提交表单
      axios.get(API.Login, {
          params: {
            login: login,
            password: password
          }
        })
        .then((res) => {
          console.log('res is', res)
          //localStorage.setItem('AdmInCookies',login);
          this.$store.dispatch('setLoginUserId', {
            loginUserId: login
          })
          localStorage.setItem('loginUserId', login)
          this.$message({
            'message': '登录成功',
            'type': 'success'
          });
          router.push({
            name: 'home'
          })
        }).catch((error) => {
          console.log(error)
          this.$message.error('登录失败，请确认用户名密码！')
          router.push({
            name: 'login'
          })
        })
    }
  }
}
</script>
