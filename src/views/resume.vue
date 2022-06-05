<template>
  <Header></Header>
  <div class="container">
    <div style="width: 100%">
      <el-button class="bnt" type="primary" @click="dialogFormVisible = true">添加</el-button>
    </div>
    <div class="info-box" v-for="(item, index) in resumeList" :key="index">
      <div class="resume-left">{{ item.title }}</div>
      <div class="resume-right">
        <el-button type="primary" @click="select(item.id)">编辑</el-button>
        <el-button type="warning" @click="select(item.id)">查看</el-button>
        <el-button type="danger" @click="open(item.id)">删除</el-button>
      </div>
    </div>
  </div>
  <el-dialog title="新增简历" v-model="dialogFormVisible">
    <el-form :model="form" label-width="120px">
      <el-upload class="avatar-uploader" action="http://localhost:8080/upload/file" :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload" :on-remove="handleRemove">
        <img v-if="form.image" :src="form.image" class="avatar"/>
        <el-button v-else class="el-icon-plus avatar-uploader-icon">上传头像</el-button>
      </el-upload>
      <el-form-item label="简历名称">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio :label="0" border>男</el-radio>
          <el-radio :label="1" border>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="form.birth" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="form.origin"/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="邮件">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item label="毕业学校">
        <el-input v-model="form.college"/>
      </el-form-item>
      <el-form-item label="最高学历">
        <el-select v-model="form.education" class="m-2" placeholder="最高学历">
          <el-option value="本科">本科</el-option>
          <el-option value="高中及以下">高中及以下</el-option>
          <el-option value="专科">专科</el-option>
          <el-option value="硕士">硕士</el-option>
          <el-option value="博士">博士</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.major"/>
      </el-form-item>
      <el-form-item label="毕业时间">
        <el-date-picker v-model="form.graduationTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="求职意向">
        <el-input v-model="form.job"/>
      </el-form-item>
      <el-form-item label="薪水范围">
        <el-input v-model="form.salary"/>
      </el-form-item>
      <el-input v-model="form.technology" :rows="3" type="textarea" placeholder="技术介绍"/>
      <el-input v-model="form.experience" :rows="3" type="textarea" placeholder="工作经历"/>
      <el-input v-model="form.project" :rows="3" type="textarea" placeholder="项目经验"/>
      <el-input v-model="form.introduction" :rows="3" type="textarea" placeholder="自我评价"/>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="addResume">确 定</el-button>
    </span>
    </template>
  </el-dialog>
  <el-dialog title="修改简历" v-model="dialogFormVisible2">
    <el-form :model="form" label-width="120px">
      <el-upload class="avatar-uploader" action="http://localhost:8080/upload/file" :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload" :on-remove="handleRemove">
        <img v-if="form.image" :src="form.image" class="avatar"/>
        <el-button v-else class="el-icon-plus avatar-uploader-icon">上传头像</el-button>
      </el-upload>
      <el-form-item label="简历名称">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio :label="0" border>男</el-radio>
          <el-radio :label="1" border>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="form.birth" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="form.origin"/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="邮件">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item label="毕业学校">
        <el-input v-model="form.college"/>
      </el-form-item>
      <el-form-item label="最高学历">
        <el-select v-model="form.education" class="m-2" placeholder="最高学历">
          <el-option value="本科">本科</el-option>
          <el-option value="高中及以下">高中及以下</el-option>
          <el-option value="专科">专科</el-option>
          <el-option value="硕士">硕士</el-option>
          <el-option value="博士">博士</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.major"/>
      </el-form-item>
      <el-form-item label="毕业时间">
        <el-date-picker v-model="form.graduationTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="求职意向">
        <el-input v-model="form.job"/>
      </el-form-item>
      <el-form-item label="薪水范围">
        <el-input v-model="form.salary"/>
      </el-form-item>
      <el-input v-model="form.technology" :rows="3" type="textarea" placeholder="技术介绍"/>
      <el-input v-model="form.experience" :rows="3" type="textarea" placeholder="工作经历"/>
      <el-input v-model="form.project" :rows="3" type="textarea" placeholder="项目经验"/>
      <el-input v-model="form.introduction" :rows="3" type="textarea" placeholder="自我评价"/>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="edit">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import Header from "@/components/header";
import axios from "axios";

export default {
  components: {Header},
  data() {
    return {
      dialogFormVisible: false
      , dialogFormVisible2: false
      , resumeList: []
      , form: {
        title: "",
        name: "",
        gender: "0",
        birth: null,
        origin: "",
        phone: "",
        email: "",
        image: "",
        college: "",
        major: "",
        education: "",
        graduationTime: null,
        experience: "",
        job: "",
        salary: "",
        technology: "",
        introduction: "",
        project: "",
        userId: ""
      }
    }
  }
  , mounted() {
    this.selectAllResume();
  }
  , methods: {
    selectAllResume() {
      const userId = sessionStorage.getItem("id");
      // console.log(userId)
      const params = new URLSearchParams();
      params.append("userId", userId);
      axios({
        method: 'post',
        url: '/api/selectAllResume',
        params
      }).then((response) => {
        this.resumeList = response.data.data;
      })
    }
    , addResume() {
      const userId = sessionStorage.getItem("id");
      this.form.userId = userId;
      const params = JSON.stringify(this.form);
      axios({
        method: 'post',
        url: '/api/addResume',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        // console.log(response)
        this.dialogFormVisible = false;
        this.form = {};
        this.selectAllResume();
      })
    }
    , select(id) {
      const params = new URLSearchParams();
      params.append("id", id);
      axios({
        method: 'post',
        url: '/api/selectResumeDetails',
        data: params,
      }).then((response) => {
        this.dialogFormVisible2 = true;
        this.form = response.data.data;
      })
    }
    , edit() {
      const params = JSON.stringify(this.form);
      // console.log(params)
      axios({
        method: 'post',
        url: '/api/edit',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        console.log(response)
        this.dialogFormVisible2 = false;
        this.form = {};
        this.selectAllResume();
      })
    }
    , open(id) {
      this.$confirm('此操作将永久删除该简历, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.deleteResume(id);
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    }
    , deleteResume(id) {
      const params = new URLSearchParams();
      params.append("id", id);
      axios({
        method: 'post',
        url: '/api/deleteResume',
        data: params,
      }).then((response) => {
        console.log(response);
        this.selectAllResume();
      })
    }
    , cancel() {
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = false;
      this.form = {}
    }
    , handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)
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
.container {
  width: 80%;
  /*background-color: #ededed;*/
  margin: 0 auto;
}

.bnt {
  margin-left: 8px;
  margin-top: 10px;
  width: 80%;
}

.info-box {
  background-color: #FFFFFF;
  width: 80%;
  height: 80px;
  margin: 10px auto;
  box-shadow: 5px 5px 3px #888888;
}

.resume-left {
  display: inline;
  float: left;
  margin-top: 30px;
  margin-left: 25px;
}

.resume-right {
  display: inline;
  float: right;
  margin-top: 30px;
  margin-right: 20px;
}

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