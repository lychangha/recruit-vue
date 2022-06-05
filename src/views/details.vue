<template>
  <Header></Header>
  <div>
    <div class="job-banner">
      <div class="job-banner-box">
        <div class="detail-box">
          <h3 class="job-name">{{ title }}</h3>
          <span class="job-salary">{{ salaryDown }}-{{ salaryUp }}k</span>
          <div class="job-box">
            <span class="job-box-info">{{ city }} . {{ experience }} . {{ degree }}</span>
            <span class="job-box-info">招聘人数:{{ quantity }}人</span>
          </div>
        </div>
        <div class="job-bnt">
          <el-button type="primary" @click="changeTab">{{this.isCollection?'已收藏':'收藏'}} </el-button>
          <el-button type="primary" @click="selectAllResume">投递</el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="left">
        <div class="left-img">
          <el-avatar :size="60" :src="imgUrl">{{ resourceManReq.nickname }}</el-avatar>
        </div>
        <div class="left-name-box">
          <span class="hr-name">{{ resourceManReq.nickname }}</span><br>
          <span class="hr-name">{{ resourceManReq.department }}</span>
        </div>
        <div class="job-sec">
          <h4>职位诱惑</h4>
          <div class="text">{{ describe }}</div>
        </div>
        <div class="job-sec">
          <h4>职位描述</h4>
          <div class="text">{{ requirements }}</div>
        </div>
        <div class="job-sec">
          <h4>公司介绍</h4>
          <div class="text">{{ introduction }}</div>
        </div>
        <div class="job-sec">
          <h4>工商信息</h4>
          <div class="info">
            <div>{{ resourceManReq.company.name }}</div>
            <br>
            <div style="display: flex">
              <span style="flex: 1">法定代表人:{{ resourceManReq.company.corporate }}</span>
              <span style="flex: 1">注册资金:{{ resourceManReq.company.capital }}人民币</span>
              <span style="flex: 1">成立日期:{{ resourceManReq.company.registerTime }}</span>
            </div>
          </div>
        </div>
        <div class="job-sec">
          <h4>工作地址</h4>
          <div class="text">{{ address }}</div>
        </div>
      </div>
      <div class="right">
        <h4 class="right-info">公司基本信息</h4>
        <div class="right-info">{{ resourceManReq.company.name }}</div>
        <div class="right-info">发展阶段:{{ resourceManReq.company.type }}</div>
        <div class="right-info">公司规模:{{ resourceManReq.company.employees }}人左右</div>
        <div class="right-info">所属行业:{{ resourceManReq.company.industry }}</div>
      </div>
    </div>
  </div>
  <el-dialog title="选择投递的简历" v-model="dialogChooseVisible">
    <el-select v-model="value" placeholder="请选择">
      <el-option  v-for="item in resumeList" :key="item.id" :label="item.title" :value="item.id" @click="holdResumeId(item.id)" @change="handleChange">
      </el-option>
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click=" dialogChooseVisible = false ">取 消</el-button>
        <el-button type="primary" @click="addSend">确 定</el-button>
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
      isCollection:false,
      resumeList: [],
      resumeId: "",
      value:"",
      dialogChooseVisible: false,
      imgUrl: "",
      title: "",
      requirements: "",
      introduction: "",
      address: "",
      salaryDown: "",
      salaryUp: "",
      city: "",
      degree: "",
      experience: "",
      quantity: "",
      describe: ""
      , resourceManReq: {
        nickname: "",
        department: ""
        , company: {
          name: "",
          corporate: "",
          capital: "",
          registerTime: "",
          type: "",
          industry: ""
          , employees: ""
        }
      }
    }
  }
  , mounted() {
    this.initData();
    this.addHits();
    this.selectIsCollection();
  }
  , methods: {
    initData() {
      let id = window.location.search.split('=')[1];
      // console.log(id)
      const params = new URLSearchParams();
      params.append("id", id)
      axios({
        method: 'post',
        url: '/api/details',
        params
      }).then((response) => {
        const data = response.data.data;
        this.requirements = data.requirements;
        this.introduction = data.resourceManReq.company.introduction;
        this.address = data.address;
        this.title = data.title;
        this.salaryDown = data.salaryDown;
        this.salaryUp = data.salaryUp;
        this.city = data.city;
        this.degree = data.degree;
        this.experience = data.experience;
        this.quantity = data.quantity;
        this.describe = data.describe;
        this.resourceManReq.nickname = data.resourceManReq.nickname;
        this.resourceManReq.department = data.resourceManReq.department;
        this.resourceManReq.company.name = data.resourceManReq.company.name;
        this.resourceManReq.company.corporate = data.resourceManReq.company.corporate;
        this.resourceManReq.company.capital = data.resourceManReq.company.capital;
        this.resourceManReq.company.registerTime = data.resourceManReq.company.registerTime.substring(0, 10);
        this.resourceManReq.company.type = data.resourceManReq.company.type;
        this.resourceManReq.company.industry = data.resourceManReq.company.industry;
        this.resourceManReq.company.employees = data.resourceManReq.company.employees;
        this.imgUrl = data.resourceManReq.image;
        // console.log(response)
      })
    }
    , addHits() {
      let id = window.location.search.split('=')[1];
      const params = new URLSearchParams();
      params.append("id", id)
      axios({
        method: 'post',
        url: '/api/addHits',
        params
      }).then((response) => {
        // console.log(response);
      })
    }
    , selectAllResume() {
      const userId = sessionStorage.getItem("id");
      const params = new URLSearchParams();
      params.append("userId", userId);
      axios({
        method: 'post',
        url: '/api/selectAllResume',
        params
      }).then((response) => {
        this.resumeList = response.data.data;
        // console.log(this.resumeList)
        this.dialogChooseVisible = true;
      })
    }
    ,addSend(){
      let positionId = window.location.search.split('=')[1];
      // console.log(positionId)
      const params = new URLSearchParams();
      params.append("resumeId",this.resumeId);
      params.append("positionId",positionId);
      axios({
        method: 'post',
        url: '/api/addSendRecord',
        params
      }).then((response) => {
        // console.log(response);
        this.dialogChooseVisible = false;
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '投递成功'
          });
        }else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      })
    }
    ,handleChange(val) {
      // val 代表 value 值
      if (val) {
        // 操作选中角色发生变化
        this.$set(this.value, this.value, val);
      } else {
        this.$set(this.value, this.value, '');
      }
    }
    , holdResumeId(id) {
      this.resumeId = id;
      // console.log(this.resumeId);
    }
    ,confirmCollection(){
      // console.log("收藏")
      const userId = sessionStorage.getItem("id");
      let positionId = window.location.search.split('=')[1];
      const params = new URLSearchParams();
      params.append("userId",userId);
      params.append("positionId",positionId);
      axios({
        method: 'post',
        url: '/api/addCollection',
        params
      }).then((response) =>{
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '收藏成功'
          });
        }else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      })
    }
    ,cancelCollection(){
      // console.log("取消收藏")
      const userId = sessionStorage.getItem("id");
      let positionId = window.location.search.split('=')[1];
      const params = new URLSearchParams();
      params.append("userId",userId);
      params.append("positionId",positionId);
      axios({
        method: 'post',
        url: '/api/deleteCollection',
        params
      }).then((response) =>{
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '取消收藏成功'
          });
        }else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      })
    }
    ,changeTab(){
      this.isCollection = !this.isCollection;
        if (this.isCollection === true){
          this.confirmCollection();
        }else {
          this.cancelCollection();
        }
    }
    ,selectIsCollection(){
      const userId = sessionStorage.getItem("id");
      let positionId = window.location.search.split('=')[1];
      const params = new URLSearchParams();
      params.append("userId",userId);
      params.append("positionId",positionId);
      axios({
        method: 'post',
        url: '/api/selectIsCollection',
        params
      }).then((response) =>{
        console.log(response)
        if (response.data.data === null){
          //没有收藏
          this.isCollection = false;
        }else {
          //收藏了
          this.isCollection = true;
        }
      })
    }
  }
}
</script>

<style scoped>
.job-banner {
  background-color: #5a5a5a;
  height: 185px
}

.job-banner-box {
  width: 80%;
  margin: 0 auto;
}

.detail-box {
  width: 500px;
  height: 175px;
  margin-left: -20px;
  float: left;
}

.job-name {
  color: #FFFFFF;
  display: inline-block;
  margin-left: 45px;
  float: left;
  line-height: 78px;
  font-size: 25px;
  margin-bottom: -10px
}

.job-salary {
  color: #F34D00;
  font-size: 25px;
  display: inline-block;
  line-height: 115px;
  float: left;
  width: 140px;
  font-weight: bold;
  margin-top: 8px;
}

.job-box {
  color: #FFFFFF;
  float: left;
  margin-left: 10px;
  font-weight: bold;
  width: 100%;
  margin-top: -20px;
}

.job-box-info {
  float: left;
  margin-left: 32px;
}

.job-bnt {
  float: right;
  width: 200px;
  height: 50px;
  margin-top: 67px;
}

.container {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}

.left {
  float: left;
  width: 850px;
}

.left-img {
  float: left;
  margin-left: 18px
}

.left-name-box {
  float: left;
  margin-left: 15px;
  line-height: 12px;
  margin-top: 12px;
}

.hr-name {
  width: auto;
  display: block;
  text-align: left;
}

.job-sec {
  float: left;
  width: 100%;
}

.job-sec h4 {
  display: block;
  text-align: left;
  margin-left: 20px;
}

.job-sec .text {
  word-break: break-all;
  word-wrap: break-word;
  color: #61687c;
  line-height: 36px;
  text-align: left;
  margin-left: 20px;
}

.job-sec .info {
  color: #61687c;
  text-align: left;
  margin-left: 20px;
}

.right {
  height: 100%;
  width: 350px;
  float: right;
  display: flex;
  flex-flow: column;
}

.right-info {
  color: #61687c;
  text-align: left;
  margin-left: 20px;
  margin-bottom: 10px;
}
</style>