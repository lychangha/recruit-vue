<template>
  <div>
    <el-card style="width: 40%;margin-left: 10px;margin-top: 10px">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-upload class="avatar-uploader" action="http://localhost:8080/upload/file" :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload" :on-remove="handleRemove">
          <img v-if="form.photo" :src="form.photo" class="avatar"/>
          <el-button v-else class="el-icon-plus avatar-uploader-icon">上传头像</el-button>
        </el-upload>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-button type="primary" @click="update">保存</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data(){
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"))
      } else if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        return callback(new Error("邮箱格式错误，请重新输入"))
      } else {
        callback()
      }
    }
    return{
      userList:[],
      form:{
        id:"",
        photo:"",
        username:"",
        nickname:"",
        email:""
      },
      rules:{
        username: [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ]
        ,nickname: [
          {required: true, message: '昵称不能为空', trigger: 'blur'}
        ]
        ,email: [
        {required: true, message: '邮箱不能为空', trigger: 'blur'},
        {validator: checkEmail, trigger: "blur"}
      ]
      }
    }
  }
  ,mounted() {
    this.showInfo()
  }
  ,methods:{
    showInfo(){
      const id = sessionStorage.getItem("id");
      const params = new URLSearchParams();
      params.append("userId",id);
      axios({
        method: 'post',
        url: '/api/user/showUserInfo',
        data: params,
      }).then((response) => {
        // console.log(response.data.data);
        this.form= response.data.data;
      })
    }
    ,update(){
      const id = sessionStorage.getItem("id");
      this.id = id;
      const params = JSON.stringify(this.form);
      // console.log(params)
      axios({
        method: 'post',
        url: '/api/user/updateInfo',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        console.log(response)
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '更新成功'
          });
          sessionStorage.setItem("nickname",this.form.nickname);
          sessionStorage.setItem("photo",this.form.photo);
          // router.go(0);
        }else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
        this.showInfo();
      })
    }
    , handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)
      this.form.photo = res.data;
    }
    , beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
    , handleRemove() {
      this.form.photo = "";
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 18px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>