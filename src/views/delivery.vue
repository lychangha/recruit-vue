<template>
  <Header></Header>
  <div class="container">
    <div style="text-align: center;margin-top: 10px;font-weight: bold;font-size: 18px">简历投递状态</div>
    <div style="margin-left: 20px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待查看" name="first" @click="selectSendByState(0)">
          <div class="send-box" v-for="(item, index) in sendList" :key="index">
            <div>
              <span class="position-info-name">{{ item.positionReq.title }}</span>
              <span class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{item.positionReq.salaryUp }}k)</span>
            </div>
            <div class="company-info">{{ item.positionReq.resourceManReq.company.name }} <span>[{{ item.positionReq.city }}]</span></div>
            <div>
              <span class="resume-left">使用简历: <span>{{ item.resume.title }}</span></span>
              <span class="resume-right">{{ item.createTime.substring(0,19) }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="被查看" name="second">
          <div class="send-box" v-for="(item, index) in sendList" :key="index">
            <div>
              <span class="position-info-name">{{ item.positionReq.title }}</span>
              <span class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{item.positionReq.salaryUp }}k)</span>
            </div>
            <div class="company-info">{{ item.positionReq.resourceManReq.company.name }} <span>[{{ item.positionReq.city }}]</span></div>
            <div>
              <span class="resume-left">使用简历: <span>{{ item.resume.title }}</span></span>
              <span class="resume-right">{{ item.createTime.substring(0,19) }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="通过初筛" name="third">
          <div class="send-box" v-for="(item, index) in sendList" :key="index">
            <div>
              <span class="position-info-name">{{ item.positionReq.title }}</span>
              <span class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{item.positionReq.salaryUp }}k)</span>
            </div>
            <div class="company-info">{{ item.positionReq.resourceManReq.company.name }} <span>[{{ item.positionReq.city }}]</span></div>
            <div>
              <span class="resume-left">使用简历: <span>{{ item.resume.title }}</span></span>
              <span class="resume-right">{{ item.createTime.substring(0,19) }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邀请面试" name="fourth">
          <div class="send-box" v-for="(item, index) in sendList" :key="index">
            <div>
              <span class="position-info-name">{{ item.positionReq.title }}</span>
              <span class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{item.positionReq.salaryUp }}k)</span>
            </div>
            <div class="company-info">{{ item.positionReq.resourceManReq.company.name }} <span>[{{ item.positionReq.city }}]</span></div>
            <div>
              <span class="resume-left">使用简历: <span>{{ item.resume.title }}</span></span>
              <span class="resume-right">{{ item.createTime.substring(0,19) }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="通过面试" name="fifth">
          <div class="send-box" v-for="(item, index) in sendList" :key="index">
            <div>
              <span class="position-info-name">{{ item.positionReq.title }}</span>
              <span class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{item.positionReq.salaryUp }}k)</span>
            </div>
            <div class="company-info">{{ item.positionReq.resourceManReq.company.name }} <span>[{{ item.positionReq.city }}]</span></div>
            <div>
              <span class="resume-left">使用简历: <span>{{ item.resume.title }}</span></span>
              <span class="resume-right">{{ item.createTime.substring(0,19) }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="不合适" name="sixth">
          <div class="send-box" v-for="(item, index) in sendList" :key="index">
            <div>
              <span class="position-info-name">{{ item.positionReq.title }}</span>
              <span class="position-info-salary">({{ item.positionReq.salaryDown }}k-{{item.positionReq.salaryUp }}k)</span>
            </div>
            <div class="company-info">{{ item.positionReq.resourceManReq.company.name }} <span>[{{ item.positionReq.city }}]</span></div>
            <div>
              <span class="resume-left">使用简历: <span>{{ item.resume.title }}</span></span>
              <span class="resume-right">{{ item.createTime.substring(0,19) }}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import axios from "axios";

export default {
  components: {Header},
  data() {
    return {
      activeName: 'first',
      sendList: []
    }
  }
  , mounted() {
    this.selectSendByState(0);
  }
  , methods: {
    selectSendByState(state) {
      const params = new URLSearchParams();
      params.append("state", state)
      axios({
        method: 'post',
        url: '/api/selectSendByState',
        data: params
      }).then((response) => {
        const userId = sessionStorage.getItem("id");
        let x = 0;
        for (let i = 0; i < response.data.data.length; i++) {
          const id = response.data.data[i].resume.userId.toString();
          if (id === userId) {
            this.sendList[x] = response.data.data[i];
            x++;
          }
        }
      })
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
  }
}
</script>

<style scoped>
.container {
  width: 60%;
  height: 100vh;
  background-color: #ededed;
  margin: 0 auto;
}

.send-box {
  background-color: #fff;
  width: 72%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-left: 3px solid dodgerblue;
  margin-bottom: 20px;
}

.position-info-name {
  float: left;
  margin-left: 20px;
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
}

.position-info-salary {
  float: left;
  margin-left: 20px;
  margin-top: 6px;
  margin-bottom: 4px;
  color: #F34D00;
}

.company-info {
  width: 100%;
  text-align: left;
  margin-left: 18px;
  margin-top: 4px;
  margin-bottom: 4px;
  color: #555;
}

.company-info span {
  color: #999;
}

.resume-left {
  float: left;
  margin-left: 20px;
  margin-bottom: 4px;
  margin-top: 4px;
  color: #999;
  font-size: 14px;
}

.resume-left span {
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
</style>