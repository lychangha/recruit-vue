<template>
  <div class="header">
    <div class="logo" @click="locationFn('/index')">开心招聘</div>
    <div class="nva">
      <span @click="locationFn('/index')">首页</span>
      <span @click="locationFn('/searchPosition')">职位</span>
      <span @click="locationFn('/information')">资讯</span>
    </div>
    <div v-if="login" class="user-dropdown">
      <el-dropdown>
        <span class="el-dropdown-link unick">
          <el-avatar :size="50" :src="imgUrl" style="background-color: black;margin-top: 8px;font-size: 8px">{{ nickname }}</el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu v-if="isHr">
            <el-dropdown-item @click="locationFn('/jobManage')">职位发布</el-dropdown-item>
            <el-dropdown-item @click="locationFn('/processFlow')">应聘者管理</el-dropdown-item>
            <el-dropdown-item @click="locationFn('/account')">账号设置</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu v-else>
            <el-dropdown-item @click="locationFn('/resume')">我的简历</el-dropdown-item>
            <el-dropdown-item @click="locationFn('/delivery')">投递记录</el-dropdown-item>
            <el-dropdown-item @click="locationFn('/collection')">收藏职位</el-dropdown-item>
            <el-dropdown-item @click="locationFn('/personal')">账号设置</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div v-else class="bnt">
      <el-button type="primary" size="small" round><a @click="locationFn('/login')">登录</a></el-button>
      <el-button type="primary" size="small" round><a @click="locationFn('/register')">注册</a></el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      login: false,
      name:"",
      nickname:"",
      imgUrl:"",
      isHr: null
    }
  }
  ,mounted() {
    this.isLogin();
    this.choose();
  }
  , methods: {
    choose(){
      const role = sessionStorage.getItem("role");
      if (role === '1'){
        this.isHr = false;
        // console.log(this.isHr)
        const imgUrl = sessionStorage.getItem("photo");
        this.imgUrl = imgUrl;
      }else if (role === '2'){
        this.isHr = true;
        // console.log(this.isHr);
        const imgUrl = sessionStorage.getItem("image");
        this.imgUrl = imgUrl;
      }
    }
    ,locationFn(url) {
      this.$router.push(url)
    }
    ,isLogin(){
      const username = sessionStorage.getItem("username");
      const nickname = sessionStorage.getItem("nickname");
      if (username === null){
        this.login = false;
      }else {
        this.login = true;
        this.name = username;
        this.nickname = nickname;
      }
    }
    ,logout(){
      const role = sessionStorage.getItem("role");
      if (role ==='1'){
        axios({
          method: 'post',
          url: '/api/user/logout',
          data: {}
        }).then((response)=>{
          sessionStorage.clear();
          this.isLogin();
          this.$message({
            type: 'success',
            message: '成功退出'
          });
          this.locationFn("/index");
        })
      }else if (role ==='2'){
        axios({
          method: 'post',
          url: '/api/resource_man/logout',
          data: {}
        }).then((response)=>{
          sessionStorage.clear();
          this.isLogin();
          this.$message({
            type: 'success',
            message: '成功退出'
          });
          this.locationFn("/index");
        })
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.header {
  height: 64px;
  background-color: black;
  padding-left: 50px;
  box-shadow: 0px 12px 24px 0px rgba(28, 31, 33, 0.1);
}

.logo {
  width: 200px;
  line-height: 64px;
  font-weight: bold;
  color: dodgerblue;
  float: left;
  cursor: pointer;
}

.nva {
  line-height: 64px;
  float: left
}

.nva span {
  margin-left: 30px;
  color: #FFFFFF;
  cursor: pointer;
}

.user-dropdown {
  height: 64px;
  width: 200px;
  float: right;
  margin-right: 30px;
}

.unick {
  line-height: 64px;
  color: #FFFFFF;
  font-weight: bold;
}
.bnt {
  width: 200px;
  float: right;
  line-height: 64px;
  margin-right: 30px
}


</style>