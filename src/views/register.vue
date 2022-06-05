<template>

  <div class="login">
    <div class="content">
      <div class="left">
      </div>
      <div class="right">
        <div class="title">账户注册</div>
        <div class="choice" ref="choice">
          <p @click="changeTabs(false)">我要找工作</p>
          <p @click="changeTabs(true)">我要招聘</p>
        </div>
        <el-form ref="registerFrom" :rules="rules" :model="registerForm">
          <el-form-item prop="username" class="item">
            <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item">
            <el-input show-password v-model="registerForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="item">
            <el-form-item prop="email">
              <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-button v-if="start === false" size="small" @click="sendEmail(isHr)" type="primary" class="email-btn">发送验证码到邮箱</el-button>
            <el-button v-else size="small" @click="sendEmail(isHr)" type="primary" class="email-btn">{{ time }}</el-button>
          </div>
          <div>
            <el-form-item prop="code" class="item">
              <el-input v-model="registerForm.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
          </div>
          <el-button class="register-btn" @click="register(registerFrom)" type="primary">注册</el-button>
        </el-form>
        <div class="register-info" @click="locationFn('/login')"><span>已有账号，去登录></span></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";


export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"))
      } else if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        return callback(new Error("邮箱格式错误，请重新输入"))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        code: null,
        email: ''
      }
      , time: 59
      , start: false
      , show: true
      , isHr: false
      , rules: {
        username: [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ]
        , password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 8, message: '密码长度不能小于8位', trigger: 'blur'}
        ]
        , email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {validator: checkEmail, trigger: "blur"}
        ]
        , code: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ]
      }
    }

  },
  methods: {
    sendEmail(isHr) {
      if (!isHr) {
        //普通用户
        let param = new URLSearchParams();
        param.append('email', this.registerForm.email);
        axios({
          method: 'post',
          url: '/api/user/sendEmail',
          data: param
        }).then((response) => {
          if (response.data.status === 10000) {
            this.$message({
              type: 'success',
              message: '邮件发送成功'
            });
            this.start = true;
            setInterval(() => {
              if (this.time !== 1) {
                this.time = this.time - 1
              } else {
                this.start = false;
              }
            }, 1000)
          }else {
            console.log(response)
            this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
      } else {
        //hr
        let param = new URLSearchParams();
        param.append('email', this.registerForm.email);
        axios({
          method: 'post',
          url: '/api/resource_man/sendEmail',
          data: param
        }).then((response) => {
          if (response.data.status === 10000) {
            this.$message({
              type: 'success',
              message: '邮件发送成功'
            });
            this.start = true;
            setInterval(() => {
              if (this.time !== 1) {
                this.time = this.time - 1
              } else {
                this.start = false;
              }
            }, 1000)
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
      }
    },
    locationFn(url) {
      this.$router.push(url)
    },
    register(registerFrom) {
      if (!this.isHr) {
        //普通用户
        let param = new URLSearchParams()
        param.append('username', this.registerForm.username);
        param.append('password', this.registerForm.password);
        param.append('email', this.registerForm.email);
        param.append('verificationCode', this.registerForm.code);
        axios({
          method: 'post',
          url: '/api/user/register',
          data: param
        }).then((response) => {
          if (response.data.status === 10000) {
            this.$message({
              type: 'success',
              message: '注册成功'
            });
            this.locationFn('/login');
          }else {
            this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
      } else {
        //hr
        let param = new URLSearchParams()
        param.append('username', this.registerForm.username);
        param.append('password', this.registerForm.password);
        param.append('email', this.registerForm.email);
        param.append('verificationCode', this.registerForm.code);
        axios({
          method: 'post',
          url: '/api/resource_man/register',
          data: param
        }).then((response) => {
          if (response.data.status === 10000) {
            this.$message({
              type: 'success',
              message: '注册成功'
            });
            this.locationFn('/login');
          }else {
            this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
      }
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
      this.registerForm = {};
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
  border-radius: 18px;
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
  font-size: 16px;
  color: #F34D00;
  line-height: 24px;
  font-weight: 600;
  margin: 0 auto;
  margin-top: 33px;
}

.register-btn {
  width: 320px;
  height: 48px;
  background: #F34D00;
  border-radius: 24px;
  margin-top: 15px
}

.register-info {
  color: #d61717;
  font-size: 12px;
  text-align: right;
  cursor: pointer;
}

.register-info span {
  margin-right: 14px;
}

.item {
  display: flex;
  width: 320px;
  margin: 20px auto;
}

.email-btn {
  flex: none;
  height: 32px;

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