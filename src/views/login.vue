<template>
  <div class="login">
    <div class="content">
      <div class="left"></div>
      <div class="right">
        <div class="title">用户登录</div>
        <div class="choice" ref="choice">
          <p @click="changeTabs(false)">我要找工作</p>
          <p @click="changeTabs(true)">我要招聘</p>
        </div>
        <el-form ref="loginForm" :rules="rules" :model="loginForm">
          <el-form-item prop="username" class="item">
            <el-input v-model="loginForm.username" placeholder="请输入你的用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item">
            <el-input type="password" show-password v-model="loginForm.password" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-button class="login-btn" @click="login(isHr)" type="primary">立即登录</el-button>
        </el-form>
        <p class="footer-desc" @click="locationFn('/register')">立即注册</p>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      loginForm: {
        username: ""
        , password: ""
      }
      , isHr: false
      , rules: {
        username: [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ]
        , password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 8, message: '密码长度不能小于8位', trigger: 'blur'}
        ]
      }
    }
  }
  , methods: {
    login(isHr) {
      if (!this.loginForm.username) {
        this.$message({
          type: 'error',
          message: '请输入用户名'
        });
        return;
      }
      if (!this.loginForm.password) {
        this.$message({
          type: 'error',
          message: '请输入密码'
        });
        return;
      }
      if (!isHr) {
        //普通用户
        let param = new URLSearchParams();
        param.append('username', this.loginForm.username);
        param.append('password', this.loginForm.password);
        axios({
          method: 'post',
          url: '/api/user/login',
          data: param
        }).then((response) => {
          if (response.data.status === 10000) {
            sessionStorage.setItem("id", response.data.data.id);
            sessionStorage.setItem("username", response.data.data.username);
            sessionStorage.setItem("nickname", response.data.data.nickname);
            sessionStorage.setItem("email", response.data.data.email);
            sessionStorage.setItem("photo", response.data.data.photo);
            sessionStorage.setItem("role", response.data.data.role);
            this.locationFn("/index");
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
      } else{
        //hr
        let param = new URLSearchParams();
        param.append('username', this.loginForm.username);
        param.append('password', this.loginForm.password);
        axios({
          method: 'post',
          url: '/api/resource_man/login',
          data: param
        }).then((response) => {
          if (response.data.status === 10000) {
            sessionStorage.setItem("id", response.data.data.id);
            sessionStorage.setItem("username", response.data.data.username);
            sessionStorage.setItem("nickname", response.data.data.nickname);
            sessionStorage.setItem("email", response.data.data.email);
            sessionStorage.setItem("phone", response.data.data.phone);
            sessionStorage.setItem("department", response.data.data.department);
            sessionStorage.setItem("code", response.data.data.code);
            sessionStorage.setItem("role", response.data.data.role);
            sessionStorage.setItem("image", response.data.data.image);
            this.locationFn("/index");
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
      }
    }
    , locationFn(url) {
      this.$router.push(url)
    },
    changeTabs(isHr) {
      if (!isHr) {
        this.$refs.choice.firstChild.style.fontWeight = '700'
        this.$refs.choice.lastChild.style.fontWeight = '400'
      } else {
        this.$refs.choice.firstChild.style.fontWeight = '400'
        this.$refs.choice.lastChild.style.fontWeight = '700'
      }
      this.isHr = isHr;
      this.loginForm = {};
    }
  }
}
</script>

<style scoped>
.login {
  background-image: url('../assets/homebg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 97vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100% !important;
}

.content {
  display: flex;
  width: 720px;
  background: #FFFFFF;
  box-shadow: 0px 12px 24px 0px rgba(28, 31, 33, 0.1);
  border-radius: 16px;
}

.left {
  width: 337px;
  flex: none;
  background-image: url('../assets/loginbg.png');
  background-size: cover;
}

.right {
  flex: 1;
}

.title {
  width: 73px;
  height: 24px;
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #F34D00;
  line-height: 24px;
  font-weight: 600;
  margin: 0 auto;
  margin-top: 33px;
}

.item {
  display: flex;
  width: 320px;
  margin: 20px auto;
}

.login-btn {
  width: 320px;
  height: 48px;
  background: #F34D00;
  border-radius: 24px;
  margin-top: 10px
}

.footer-desc {
  width: 68px;
  height: 24px;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #F34D00;
  text-align: left;
  line-height: 24px;
  font-weight: 600;
  margin-top: 22px;
  margin: 22px auto;
  cursor: pointer;
}

.choice {
  text-align: left;
  margin-bottom: -7px;
  cursor: pointer;
}

.choice p {
  display: inline-block;
  width: 173px;
  height: 10px;
  text-align: center;
  line-height: 20px;
  color: #5a5a5a;
}

.choice p:first-child {
  border-right: 2px solid #ededed;
  font-weight: 700;
}
</style>