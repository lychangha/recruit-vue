<template>
  <el-card style="width: 40%;margin-left: 10px;margin-top: 10px">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-upload class="avatar-uploader" action="http://localhost:8080/upload/file" :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload" :on-remove="handleRemove">
        <img v-if="form.image" :src="form.image" class="avatar"/>
        <el-button v-else class="el-icon-plus avatar-uploader-icon">公司图片</el-button>
      </el-upload>
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="注册时间" prop="registerTime">
        <el-date-picker v-model="form.registerTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="员工数量" prop="employees">
        <el-input-number v-model="form.employees" :min="1"/>
      </el-form-item>
      <el-form-item label="公司地址" prop="address">
        <el-input v-model="form.address"/>
      </el-form-item>
      <el-form-item label="注册资金" prop="capital">
        <el-input v-model="form.capital"/>
      </el-form-item>
      <el-form-item label="公司法人" prop="corporate">
        <el-input v-model="form.corporate"/>
      </el-form-item>
      <el-form-item label="公司邮箱" prop="email">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item label="公司电话" prop="phone">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="公司简介" prop="introduction">
        <el-input v-model="form.introduction" :rows="3" type="textarea" placeholder="公司简介"/>
      </el-form-item>
      <el-form-item label="融资阶段" prop="type">
        <el-select v-model="form.type" class="m-2" placeholder="融资阶段">
          <el-option value="不限">不限</el-option>
          <el-option value="未融资">未融资</el-option>
          <el-option value="天使轮">天使轮</el-option>
          <el-option value="A轮">A轮</el-option>
          <el-option value="B轮">B轮</el-option>
          <el-option value="C轮">C轮</el-option>
          <el-option value="D轮及以上">D轮及以上</el-option>
          <el-option value="已上市">已上市</el-option>
          <el-option value="不需融资">不需融资</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司行业" prop="industry">
        <el-input v-model="form.industry"/>
      </el-form-item>
      <el-form-item label="公司编码" prop="code">
        <el-input v-model="form.code"/>
      </el-form-item>
        <el-button type="primary" @click="updateCompanyInfo">确认更新</el-button>
        <el-button type="primary" @click="addCompanyInfo">确认保存</el-button>
    </el-form>
  </el-card>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      hasCode: true,
      form: {
        image: "",
        name: "",
        registerTime: "",
        employees: 0,
        address: "",
        capital: "",
        corporate: "",
        email: "",
        phone: "",
        introduction: "",
        industry: "",
        code: ""
      }
      , rules: {}
    }
  }
  , mounted() {
    this.showCompanyInfo();
  }
  , methods: {
    showCompanyInfo() {
      const code = sessionStorage.getItem("code");
      const params = new URLSearchParams();
      params.append("code", code);
      axios({
        method: 'post',
        url: '/api/selectCompanyInfo',
        data: params,
      }).then((response) => {
        // console.log(response);
        this.form = (response.data.data || {});
      })
    }
    , updateCompanyInfo() {
      const params = JSON.stringify(this.form);
      // console.log(params)
      axios({
        method: 'post',
        url: '/api/updateCompanyInfo',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        console.log(response);
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '更新成功'
          });
          this.updateHrCode(this.form.code);
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      });
      // router.go(0);
    }
    ,addCompanyInfo(){
      const params = JSON.stringify(this.form);
      console.log(params)
      axios({
        method: 'post',
        url: '/api/addCompanyInfo',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        // console.log(response);
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '保存成功'
          });
          sessionStorage.setItem("code",this.form.code)
          this.updateHrCode(this.form.code);
        }else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      });
    }
    ,updateHrCode(code){
      const id = sessionStorage.getItem("id");
      const params = new URLSearchParams();
      params.append("id",id);
      params.append("code",code);
      axios({
        method: 'post',
        url: '/api/resource_man/updateHrCode',
        data: params,
      }).then((response) => {
        console.log(response);
      })
    }
    , handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(res)
      this.form.image = res.data;
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
      this.form.image = "";
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