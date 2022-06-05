<template>
  <Header></Header>
  <div class="container">
    <div class="up-box">
      <div class="up-box-center">
        <div class="hr-info">
          <div class="hr-info-left">
            <el-avatar class="hr-image" shape="square" :size="90" :src="hrImage"/>
          </div>
          <div class="hr-info-right">
            <div style="color: #FFFFFF">
              <div class="hr-info-name">{{ nickname }}</div>
              <div class="hr-info-department">{{ department }}</div>
              <div class="hr-info-email">{{ email }}</div>
            </div>
          </div>
        </div>
        <div class="company-info">
          <div class="company-info-left">
            <div style="margin-top: 40px;color: #FFFFFF">
              <div class="company-info-name">{{ company.name }}</div>
              <div class="company-info-group">
                <span>{{ company.industry }}</span><span>{{ company.employees }}左右</span><span>{{ company.type }}</span>
              </div>
              <div class="company-address">{{ company.address }}</div>
            </div>
          </div>
          <div class="company-info-right">
            <!--            <el-avatar class="company-image" shape="square" :size="90" :src="company.image" fit="contain"/>-->
            <img class="company-image" :src="company.image" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="down-box">
      <div class="down-box-title">简历处理</div>
      <div style="margin-left: 30px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待查看" name="first">
            <div class="send-box" v-for="(item, index) in sendList" :key="index">
              <div style="float:left;width: 300px">
                <div style="width: 300px;height: 30px">
                  <div class="position-info-name">{{ item.positionReq.title }}</div>
                  <div class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{
                      item.positionReq.salaryUp
                    }}k)</div>
                </div>
                <div class="company-box-info">{{ item.positionReq.resourceManReq.company.name }}
                  <span>[{{ item.positionReq.city }}]</span></div>
                <div>
                  <div class="resume-left">
                    <span>投递者的简历:</span>
                    <span>{{ item.resume.title }}</span>
                  </div>
                </div>
              </div>
              <div style="height: 86px;width: 300px;float: right">
                <div style="margin-top: 24px;text-align: right;margin-right: 5px">
                  <el-button type="primary"  @click="selectAndUpdate(item.resumeId,item.id)">查看简历</el-button>
                </div>
                <div class="resume-right">{{ item.updateTime.substring(0, 19) }}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="被查看" name="second">
            <div class="send-box" v-for="(item, index) in sendList" :key="index">
              <div style="float:left;width: 300px">
                <div style="width: 300px;height: 30px">
                  <div class="position-info-name">{{ item.positionReq.title }}</div>
                  <div class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{
                      item.positionReq.salaryUp
                    }}k)</div>
                </div>
                <div class="company-box-info">{{ item.positionReq.resourceManReq.company.name }}
                  <span>[{{ item.positionReq.city }}]</span></div>
                <div>
                  <div class="resume-left">
                    <span>投递者的简历:</span>
                    <span>{{ item.resume.title }}</span>
                  </div>
                </div>
              </div>
              <div style="height: 86px;width: 300px;float: right">
                <div style="margin-top: 24px;text-align: right;margin-right: 5px">
                  <el-button type="primary"  @click="select(item.resumeId)">查看简历</el-button>
                  <el-button type="primary"  @click="updateSendState(item.id,20)">通过初筛</el-button>
                  <el-button type="primary"  @click="updateSendState(item.id,50)">不合适</el-button>
                </div>
                <div class="resume-right">{{ item.updateTime.substring(0, 19) }}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="通过初筛" name="third">
            <div class="send-box" v-for="(item, index) in sendList" :key="index">
              <div style="float:left;width: 300px">
                <div style="width: 300px;height: 30px">
                  <div class="position-info-name">{{ item.positionReq.title }}</div>
                  <div class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{
                      item.positionReq.salaryUp
                    }}k)</div>
                </div>
                <div class="company-box-info">{{ item.positionReq.resourceManReq.company.name }}
                  <span>[{{ item.positionReq.city }}]</span></div>
                <div>
                  <div class="resume-left">
                    <span>投递者的简历:</span>
                    <span>{{ item.resume.title }}</span>
                  </div>
                </div>
              </div>
              <div style="height: 86px;width: 300px;float: right">
                <div style="margin-top: 24px;text-align: right;margin-right: 5px">
                  <el-button type="primary"  @click="select(item.resumeId)">查看简历</el-button>
                  <el-button type="primary"  @click="updateSendState(item.id,30)">邀请面试</el-button>
                  <el-button type="primary"  @click="updateSendState(item.id,50)">不合适</el-button>
                </div>
                <div class="resume-right">{{ item.updateTime.substring(0, 19) }}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="邀请面试" name="fourth">
            <div class="send-box" v-for="(item, index) in sendList" :key="index">
              <div style="float:left;width: 300px">
                <div style="width: 300px;height: 30px">
                  <div class="position-info-name">{{ item.positionReq.title }}</div>
                  <div class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{
                      item.positionReq.salaryUp
                    }}k)</div>
                </div>
                <div class="company-box-info">{{ item.positionReq.resourceManReq.company.name }}
                  <span>[{{ item.positionReq.city }}]</span></div>
                <div>
                  <div class="resume-left">
                    <span>投递者的简历:</span>
                    <span>{{ item.resume.title }}</span>
                  </div>
                </div>
              </div>
              <div style="height: 86px;width: 300px;float: right">
                <div style="margin-top: 24px;text-align: right;margin-right: 5px">
                  <el-button type="primary"  @click="select(item.resumeId)">查看简历</el-button>
                  <el-button type="primary"  @click="updateSendState(item.id,40)">通过面试</el-button>
                  <el-button type="primary"  @click="updateSendState(item.id,50)">不合适</el-button>
                </div>
                <div class="resume-right">{{ item.updateTime.substring(0, 19) }}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="通过面试" name="fifth">
            <div class="send-box" v-for="(item, index) in sendList" :key="index">
              <div style="float:left;width: 300px">
                <div style="width: 300px;height: 30px">
                  <div class="position-info-name">{{ item.positionReq.title }}</div>
                  <div class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{
                      item.positionReq.salaryUp
                    }}k)</div>
                </div>
                <div class="company-box-info">{{ item.positionReq.resourceManReq.company.name }}
                  <span>[{{ item.positionReq.city }}]</span></div>
                <div>
                  <div class="resume-left">
                    <span>投递者的简历:</span>
                    <span>{{ item.resume.title }}</span>
                  </div>
                </div>
              </div>
              <div style="height: 86px;width: 300px;float: right">
                <div style="margin-top: 24px;text-align: right;margin-right: 5px">
                  <el-button type="primary"  @click="select(item.resumeId)">查看简历</el-button>
                </div>
                <div class="resume-right">{{ item.updateTime.substring(0, 19) }}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="不合适" name="sixth">
            <div class="send-box" v-for="(item, index) in sendList" :key="index">
              <div style="float:left;width: 300px">
                <div style="width: 300px;height: 30px">
                  <div class="position-info-name">{{ item.positionReq.title }}</div>
                  <div class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{
                      item.positionReq.salaryUp
                    }}k)</div>
                </div>
                <div class="company-box-info">{{ item.positionReq.resourceManReq.company.name }}
                  <span>[{{ item.positionReq.city }}]</span></div>
                <div>
                  <div class="resume-left">
                    <span>投递者的简历:</span>
                    <span>{{ item.resume.title }}</span>
                  </div>
                </div>
              </div>
              <div style="height: 86px;width: 300px;float: right">
                <div style="margin-top: 24px;text-align: right;margin-right: 5px">
                  <el-button type="primary"  @click="select(item.resumeId)">查看简历</el-button>
                </div>
                <div class="resume-right">{{ item.updateTime.substring(0, 19) }}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  <el-dialog title="查看简历" v-model="dialogFormVisible2">
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
      <el-button type="primary" @click="cancel">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import Header from "@/components/header";
import axios from "axios";
import router from "@/router";

export default {
  components: {Header},
  data() {
    return {
      dialogFormVisible2: false
      , nickname: ""
      , hrImage: ""
      , department: ""
      , email: ""
      , company: {}
      , activeName: 'first'
      , sendList: []
      , form: {}
    }
  }
  , mounted() {
    this.showHrInfo();
    this.showCompanyInfo();
    this.selectSendByState(0);
  }
  , methods: {
    showHrInfo() {
      const nickname = sessionStorage.getItem("nickname");
      const hrImage = sessionStorage.getItem("image");
      const department = sessionStorage.getItem("department");
      const email = sessionStorage.getItem("email");
      this.nickname = nickname;
      this.hrImage = hrImage;
      this.department = department;
      this.email = email;
    }
    , showCompanyInfo() {
      const code = sessionStorage.getItem("code");
      const params = new URLSearchParams();
      params.append("code", code);
      axios({
        method: 'post',
        url: '/api/selectCompanyInfo',
        data: params
      }).then((response) => {
        this.company = response.data.data;
        // console.log(this.company)
      })
    }
    , selectSendByState(state) {
      const params = new URLSearchParams();
      params.append("state", state)
      axios({
        method: 'post',
        url: '/api/selectSendByState',
        data: params
      }).then((response) => {
        // console.log(response)
        const HrId = sessionStorage.getItem("id");
        console.log(HrId)
        let x = 0;
        for (let i = 0; i < response.data.data.length; i++) {
          const id = response.data.data[i].positionReq.resourceManReq.id.toString();
          if (id == HrId) {
            this.sendList[x] = response.data.data[i];
            x++;
          }
        }
        console.log(this.sendList)
      })
    }
    , updateSendState(id,state){
      console.log(state)
      const params = new URLSearchParams();
      params.append("state",state);
      params.append("id",id);
      axios({
        method: 'post',
        url: '/api/updateSendState',
        data: params,
      }).then((response) => {
        console.log(response)
        if (response.data.status === 10000) {
          if (state === 10){
            this.$message({
              type: 'success',
              message: '已查看'
            });
          }else if (state === 20){
            this.$message({
              type: 'success',
              message: '已通过初筛'
            });
          }else if (state === 30){
            this.$message({
              type: 'success',
              message: '已邀请面试'
            });
          }else if (state === 40){
            this.$message({
              type: 'success',
              message: '通过面试'
            });
          }else if (state === 50){
            this.$message({
              type: 'success',
              message: '不合适'
            });
          }
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      })
    }
    , select(resumeId) {
      const params = new URLSearchParams();
      params.append("id", resumeId);
      axios({
        method: 'post',
        url: '/api/selectResumeDetails',
        data: params,
      }).then((response) => {
        this.dialogFormVisible2 = true;
        this.form = response.data.data;
      })
    }
    ,selectAndUpdate(resumeId,id){
      this.select(resumeId);
      this.updateSendState(id,10);
    }
    , handleClick(tab, event) {
      if (tab.props.name === 'first'){
        this.sendList = [];
        this.selectSendByState(0);
      }else if (tab.props.name === 'second'){
        this.sendList = [];
        this.selectSendByState(10);
      }else if (tab.props.name === 'third'){
        this.sendList = [];
        this.selectSendByState(20);
      }else if (tab.props.name === 'fourth'){
        this.sendList = [];
        this.selectSendByState(30);
      }else if (tab.props.name === 'fifth'){
        this.sendList = [];
        this.selectSendByState(40);
      }else if (tab.props.name === 'sixth'){
        this.sendList = [];
        this.selectSendByState(50);
      }
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
    , cancel() {
      this.dialogFormVisible2 = false;
      this.$message({
        type: 'success',
        message: '已查看'
      });
      // router.go(0);
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  /*background-color: #ededed;*/
  margin: 0 auto;
}

.up-box {
  background-color: #6b778c;
  height: 150px;
}

.up-box-center {
  width: 64%;
  height: 300px;
  margin: 0 auto;
}

.hr-info {
  float: left;
  width: 480px;
  height: 150px;
  display: flex;
}

.hr-info-left {
  flex: 0 0 180px;
  height: 150px;
}

.hr-image {
  margin: 35px 0 25px 0
}

.hr-info-right {
  flex: 1;
  height: 150px;
  display: flex;
  align-items: center;
}

.hr-info-name {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin: 6px 0 6px 0;
}

.hr-info-department {
  text-align: left;
  font-size: 14px;
  margin: 6px 0 6px 0;
}

.hr-info-email {
  text-align: left;
  font-size: 16px;
  margin: 6px 0 0 0;
}

.company-info {
  float: right;
  width: 480px;
  height: 150px;
  display: flex;
}

.company-info-left {
  flex: 0 0 300px;
  height: 150px;
}

.company-info-name {
  text-align: right;
  font-size: 24px;
  font-weight: bold;
  margin: 6px 0 6px 0;
}

.company-info-group {
  text-align: right;
  font-size: 14px;
  margin: 6px 0 6px 0;
}

.company-address {
  text-align: right;
  font-size: 16px;
  margin: 6px 0 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.company-info-group span {
  margin-left: 20px;
}

.company-info-right {
  flex: 1;
  height: 150px;
}

.company-image {
  margin: 35px 0 25px 0;
  width: 87px;
  height: 87px;
  border-radius: 10px 10px 10px 10px;
}

.down-box {
  width: 64%;
  /*height: 900px;*/
  background-color: #FFFFFF;
  margin: 0 auto;
}

.down-box-title {
  width: 200px;
  margin-left: 30px;
  margin-top: 10px;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.send-box {
  background-color: #fff;
  width: 72%;
  height: 90px;
  margin: 0 auto;
  border: 2px solid #ededed;
  border-left: 3px solid dodgerblue;
  margin-bottom: 20px;
}

.position-info-name {
  float: left;
  margin-left: 18px;
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
}

.position-info-salary {
  width: 80px;
  float: left;
  margin-left: 24px;
  margin-top: 6px;
  margin-bottom: 4px;
  color: #F34D00;
}

.company-box-info {
  width: 100%;
  text-align: left;
  margin-left: 18px;
  margin-top: 4px;
  margin-bottom: 4px;
  color: #555;
}

.company-box-info span {
  color: #999;
}

.resume-left {
  /*float: left;*/
  margin-left: 18px;
  margin-bottom: 4px;
  margin-top: 7px;
  color: #999;
  font-size: 14px;
}

.resume-left span {
  float: left;
  color: #555;
}

.resume-right {
  float: right;
  margin-right: 20px;
  /*margin-bottom: 2px;*/
  margin-top: 6px;
  color: #999;
  font-size: 14px
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