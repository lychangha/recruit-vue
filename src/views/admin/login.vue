<template>
  <div class="backg">
    <div>
      <el-form ref="loginForm" label-width="80px" :rules="rules" :model="form" class="login-box">
        <h2 class="login-title">开心招聘后台管理</h2>
        <el-form-item label="账号" prop="username">
          <el-input type="text" placeholder="请输入账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" show-password placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="login" style="width:200px">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
      , rules: {
        username: [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ]
        , password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }

  }
  , mounted() {
  }
  , methods: {
    login() {
      const param = new URLSearchParams();
      param.append('username', this.form.username);
      param.append('password', this.form.password);
      axios({
        method: 'post',
        url: '/api/admin/login',
        data: param
      }).then((response) => {
        if (response.data.status === 10000) {
          sessionStorage.setItem("id", response.data.data.id);
          sessionStorage.setItem("username", response.data.data.username);
          sessionStorage.setItem("name", response.data.data.name);
          sessionStorage.setItem("role", response.data.data.role);
          this.locationFn("/admin/main");
          this.$message({
            type: 'success',
            message: '登陆成功'
          });
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      });
    }
    , locationFn(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
.backg {
  background-image: url('../../assets/homebg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 97vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100% !important;
}

.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background: #FFFFFF;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>