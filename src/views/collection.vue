<template>
  <Header></Header>
  <div class="container">
    <div class="info-box" v-for="(item, index) in positionList" :key="index">
      <div class="job-primary">
        <div class="info-primary">
          <div class="primary-wrapper" @click="locationFn('/details?id='+item.positionId)">
            <div>
              <div class="item-top-title">{{ item.positionReq.title }}</div>
              <div class="item-top-salary">{{ item.positionReq.salaryDown }}-{{ item.positionReq.salaryUp }}k</div>
            </div>
            <div class="item-top-info">
              <span>{{ item.positionReq.city }}|</span>
              <span>{{ item.positionReq.experience }}|</span>
              <span>{{ item.positionReq.degree }}</span></div>
          </div>
          <div class="info-company">
            <div class="company-title">
              <div class="company-name">{{ item.positionReq.resourceManReq.company.name}}</div>
              <div class="company-info">
                <span>{{ item.positionReq.resourceManReq.company.industry}}</span>|
                <span>{{ item.positionReq.resourceManReq.company.type}}</span>|
                <span>{{ item.positionReq.resourceManReq.company.employees}}左右</span>
              </div>
            </div>
            <div style="float: right"><img class="company-image" :src="item.positionReq.resourceManReq.company.image" alt=""></div>
          </div>
        </div>
        <div class="info-append">
          <div class="tags">
            <span class="tag-item">{{ item.positionReq.subtitle }}</span>
          </div>
          <div class="info-desc">{{ item.positionReq.describe }}</div>
        </div>
      </div>
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
      positionList: []
    }
  }
  , mounted() {
    this.selectCollection();
  }
  , methods: {
    selectCollection() {
      const params = new URLSearchParams();
      const userId = sessionStorage.getItem("id");
      params.append("userId", userId)
      axios({
        method: 'post',
        url: '/api/selectCollection',
        data: params
      }).then((response) => {
        this.positionList = response.data.data;
        console.log(this.positionList)
      })
    }
    ,locationFn(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
.container {
  width: 80%;
  height: 100vh;
  /*background-color: #ededed;*/
  margin: 0 auto;
}

.info-box {
  width: 80%;
  height: 130px;
  margin: 10px auto;
  box-shadow: 5px 5px 3px #888888;
  cursor: pointer;
  background: #fff;
}

.job-primary {
  height: 140px;
  box-sizing: border-box;
  padding: 0;
  color: #4a4160;
  margin: 0 30px;
  border-bottom: 1px #f2f2f5 solid;
  position: relative;
}

/**************************************************************/
.info-primary {
  width: auto;
  height: 70px;
  padding-top: 20px;
  float: none;
  display: flex;
}

/**************************************************************/
.primary-wrapper {
  vertical-align: top;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /*background-color: #ededed;*/
  height: 100%;
  flex: 1;
}

.item-top-title {
  margin-left: 20px;
  float: left;
  font-weight: bold;
  margin-right: 30px;
}

.item-top-salary {
  width: 170px;
  text-align: right;
  margin-top: 12px;
  color: #F34D00;
}

.item-top-info {
  /*background-color: #6b778c;*/
  margin-left: 20px;
  font-size: small;
  color: #5a5a5a;
}

.item-top-info span {
  float: left;
}

/**************************************************************/
.info-company {
  height: 100%;
  width: 350px;
  float: right;
  vertical-align: top;
  /*background-color: #6b778c;*/
}

.company-title {
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 14px;
  margin-left: 4px;
}

.company-name {
  text-align: left;
  font-weight: bold;
}

.company-info {
  margin-top: 6px;
  font-size: 12px;
}

.company-image {
  height: 50px;
  width: 50px;
  margin-top: 8px;
  margin-right: 35px;
}

/**************************************************************/
.info-append {
  height: 40px;
  line-height: 40px;
  margin: 0 -30px;
  padding: 0 30px;
  background: #f8f9fc;
  display: flex;
}

.tags {
  float: left;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 325px;
  font-size: 0;
  height: 40px;
}

.tag-item {
  font-size: 12px;
  height: 21px;
  line-height: 21px;
  padding: 0 8px;
  border: 1px solid #eee;
  border-radius: 2px;
  display: inline-block;
  margin-right: 10px;
  margin-top: 9px;
  color: #61687c;
}

.info-desc {
  font-size: 13px;
  float: left;
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #61687c;
}

/**************************************************************/
</style>