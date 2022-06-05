<template>
  <div>
    <el-card style="width: 40%;margin-left: 10px;margin-top: 10px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled/>
        </el-form-item>
        <el-form-item label="旧密码" placeholder="请输入旧密码" prop="password">
          <el-input show-password v-model="form.password"/>
        </el-form-item>
        <el-form-item label="新密码" placeholder="请输入新密码" prop="password">
          <el-input show-password v-model="newPassword"/>
        </el-form-item>
        <el-button type="primary" @click="updatePassword">保存</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newPassword: ""
      , form: {
        username:"",
        password:""
      }
      ,rules:{
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 8, message: '密码长度不能小于8位', trigger: 'blur'}
        ]
      }
    }
  }
  , mounted() {
    this.showInfo();
  }
  , methods: {
    showInfo() {
      const id = sessionStorage.getItem("id");
      const params = new URLSearchParams();
      params.append("userId", id);
      axios({
        method: 'post',
        url: '/api/user/showUserInfo',
        data: params,
      }).then((response) => {
        // console.log(response.data.data);
        this.form = response.data.data;
      })
    }
    ,updatePassword(){
      const params = new URLSearchParams();
      params.append("username",this.form.username);
      params.append("password",this.form.password);
      params.append("newPassword",this.newPassword);
      axios({
        method: 'post',
        url: '/api/user/updatePassword',
        data: params,
      }).then((response) => {
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '更新成功'
          });
          this.logout();
        }else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      })
    }
    ,locationFn(url) {
      this.$router.push(url)
    }
    ,logout(){
      axios({
        method: 'post',
        url: '/api/user/logout',
        data: {}
      }).then((response)=>{
        sessionStorage.clear();
        this.$message({
          type: 'success',
          message: '成功退出'
        });
        this.locationFn("/index");
      })
    }
  }
}
</script>

<style scoped>

</style>