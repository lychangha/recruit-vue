<template>
  <Header></Header>
  <div class="find-box">
    <div class="search">
      <input v-model="search.title" type="search" placeholder="请输入职位">
      <button @click="showInfo" type="button">搜索</button>
    </div>
  </div>
  <div class="find-box-container">
    <div class="find-box-war">
      <div class="find-box-city">
        <span class="find-box-city-title">工作地点</span>
        <span><el-button @click="changeAddress('')">全国</el-button></span>
        <span><el-button @click="changeAddress('北京')">北京</el-button></span>
        <span><el-button @click="changeAddress('上海')">上海</el-button></span>
        <span><el-button @click="changeAddress('广州')">广州</el-button></span>
        <span><el-button @click="changeAddress('深圳')">深圳</el-button></span>
        <span><el-button @click="changeAddress('杭州')">杭州</el-button></span>
        <span><el-button @click="changeAddress('成都')">成都</el-button></span>
        <span><el-button @click="changeAddress('南京')">南京</el-button></span>
        <span><el-button @click="changeAddress('武汉')">武汉</el-button></span>
        <span><el-button @click="changeAddress('西安')">西安</el-button></span>
        <span><el-button @click="changeAddress('厦门')">厦门</el-button></span>
        <span><el-button @click="changeAddress('长沙')">长沙</el-button></span>
        <span><el-button @click="changeAddress('苏州')">苏州</el-button></span>
      </div>
      <div>
        <el-select class="find-condition" v-model="search.experience" @change="showInfo" placeholder="工作经验">
          <el-option value="不限" label="工作经验">不限</el-option>
          <el-option value="在校/应届">在校/应届</el-option>
          <el-option value="3年及以下">3年及以下</el-option>
          <el-option value="3-5年">3-5年</el-option>
          <el-option value="5-10年">5-10年</el-option>
          <el-option value="10年以上">10年以上</el-option>
        </el-select>
        <el-select class="find-condition" v-model="search.degree" @change="showInfo" placeholder="学历要求">
          <el-option value="不限" label="学历要求">不限</el-option>
          <el-option value="大专">大专</el-option>
          <el-option value="本科">本科</el-option>
          <el-option value="硕士">硕士</el-option>
          <el-option value="博士">博士</el-option>
        </el-select>
        <el-select class="find-condition" v-model="salary" @change="changeSalary" placeholder="薪资要求">
          <el-option value="" label="薪资要求">不限</el-option>
          <el-option value="2k以下">2k以下</el-option>
          <el-option value="2k-5k">2k-5k</el-option>
          <el-option value="5k-10k">5k-10k</el-option>
          <el-option value="10k-15k">10k-15k</el-option>
          <el-option value="15k以上">15k以上</el-option>
        </el-select>
        <el-select class="find-condition" v-model="search.type" @change="changeType" placeholder="融资阶段">
          <el-option value="" label="融资阶段">不限</el-option>
          <el-option value="未融资">未融资</el-option>
          <el-option value="天使轮">天使轮</el-option>
          <el-option value="A轮">A轮</el-option>
          <el-option value="B轮">B轮</el-option>
          <el-option value="C轮">C轮</el-option>
          <el-option value="上市公司">上市公司</el-option>
          <el-option value="不需要融资">不需要融资</el-option>
        </el-select>
        <el-select class="find-condition" @change="changeEmployees" v-model="employees" placeholder="公司规模">
          <el-option value="" label="公司规模">不限</el-option>
          <el-option value="少于15人">少于15人</el-option>
          <el-option value="15-50人">15-50人</el-option>
          <el-option value="50-150人">50-150人</el-option>
          <el-option value="150-500人">150-500人</el-option>
          <el-option value="500-2000人">500-2000人</el-option>
          <el-option value="2000人以上">2000人以上</el-option>
        </el-select>
        <span @click="clear" style="font-size: 14px;line-height: 60px;cursor: pointer;color: #99a9bf">清空筛选条件</span>
      </div>
    </div>
  </div>
  <div>
    <div class="container">
      <div class="find-box-sort">
        <span class="find-box-sort-title">排序方式:&nbsp;&nbsp;</span>
        <el-radio-group class="find-box-sort-title" @change="changeRank" v-model="radio" size="large">
          <el-radio-button label="默认"/>
          <el-radio-button label="最新"/>
        </el-radio-group>
      </div>
      <div>
        <div v-for="(item, index) in positionList" :key="index" class="info-box">
          <div class="job-primary">
            <div class="info-primary">
              <div class="primary-wrapper" @click="locationFn('/details?id='+item.id)">
                <div>
                  <div class="item-top-title">{{ item.title }}</div>
                  <div class="item-top-salary">{{ item.salaryDown }}-{{ item.salaryUp }}k</div>
                </div>
                <div class="item-top-info">
                  <span>{{ item.city }}|</span>
                  <span>{{ item.experience }}|</span>
                  <span>{{ item.degree }}</span></div>
              </div>
              <div class="info-company">
                <div class="company-title">
                  <div class="company-name">{{ item.company.name }}</div>
                  <div class="company-info">
                    <span>{{ item.company.industry }}</span>|
                    <span>{{ item.company.type }}</span>|
                    <span>{{ item.company.employees }}左右</span>
                  </div>
                </div>
                <div style="float: right">
                  <img class="company-image" :src="item.company.image" alt="#">
                </div>
              </div>
            </div>
            <div class="info-append">
              <div class="tags">
                <span class="tag-item">{{ item.subtitle }}</span>
              </div>
              <div class="info-desc">{{ item.describe }}</div>
            </div>
          </div>
        </div>
        <div style="margin-left: 300px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="search.currentPage"
              :page-sizes="[5, 10, 20]"
              :page-size="search.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/header"
import axios from "axios";

export default {
  components: {Header}
  , data() {
    return {
      total: 10,
      radio: "默认",
      positionList: [],
      salary: "",
      employees: "",
      search: {
        title: "",
        city: null,
        experience: null,
        degree: null,
        type: null,
        employeesDown: null,
        employeesUp: null,
        salaryDown: null,
        salaryUp: null,
        rank: "hits",
        currentPage: 1,
        pageSize: 5,
      },
    }
  }
  , mounted() {
    this.showInfo();
    let title = window.location.search.split('=')[1];
    this.search.title = title;
    this.showInfo();
  }
  , methods: {
    showInfo() {
      const params = JSON.stringify(this.search);
      // console.log(params)
      axios({
        method: 'post',
        url: '/api/searchByConditions',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        // console.log(response);
        this.positionList = response.data.data.list;
        // console.log(this.positionList)
        this.total = response.data.data.total;
      })
    }
    , clear() {
      const rank = this.search.rank;
      const currentPage = this.search.currentPage;
      const pageSize = this.search.pageSize;
      this.search = {};
      this.search.rank = rank;
      this.search.pageSize = pageSize;
      this.search.currentPage = currentPage;
      console.log(this.search);
      this.showInfo();
    }
    , changeType() {
      this.showInfo();
    }
    , changeSalary() {
      if (this.salary === '') {
        this.search.salaryDown = "";
        this.search.salaryUp = "";
      } else if (this.salary === '2k以下') {
        this.search.salaryDown = 1;
        this.search.salaryUp = 2;
      } else if (this.salary === '2k-5k') {
        this.search.salaryDown = 2;
        this.search.salaryUp = 5;
      } else if (this.salary === '5k-10k') {
        this.search.salaryDown = 5;
        this.search.salaryUp = 10;
      } else if (this.salary === '10k-15k') {
        this.search.salaryDown = 10;
        this.search.salaryUp = 15;
      } else if (this.salary === '15k以上') {
        this.search.salaryDown = 15;
        this.search.salaryUp = 99999;
      }
      this.showInfo();
    }
    , changeEmployees() {
      if (this.employees === "") {
        this.search.employeesDown = "";
        this.search.employeesUp = "";
      } else if (this.employees === "少于15人") {
        this.search.employeesDown = 0;
        this.search.employeesUp = 15;
      } else if (this.employees === "15-50人") {
        this.search.employeesDown = 15;
        this.search.employeesUp = 50;
      } else if (this.employees === "50-150人") {
        this.search.employeesDown = 50;
        this.search.employeesUp = 150;
      } else if (this.employees === "150-500人") {
        this.search.employeesDown = 150;
        this.search.employeesUp = 500;
      } else if (this.employees === "500-2000人") {
        this.search.employeesDown = 500;
        this.search.employeesUp = 2000;
      } else if (this.employees === "2000人以上") {
        this.search.employeesDown = 2000;
        this.search.employeesUp = 9999999;
      }
      this.showInfo();
      console.log("最高" + this.search.employeesUp);
      console.log("最低" + this.search.employeesDown);
    }
    , changeRank() {
      if (this.radio === "默认") {
        this.search.rank = "hits";
        this.showInfo();
      } else {
        this.search.rank = "release";
        this.showInfo();
      }
      console.log(this.search.rank);
    }
    , changeAddress(address) {
      this.search.city = address.toString();
      console.log(this.search.city);
      this.showInfo();
    }
    , locationFn(url) {
      this.$router.push(url)
    }
    , handleSizeChange(val) {
      this.search.pageSize = val;
      this.showInfo();
    },
    handleCurrentChange(val) {
      this.search.currentPage = val;
      this.showInfo();
    }
  }
}
</script>

<style scoped>
.find-box {
  height: 78px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.find-box-container {
  height: 120px;
  width: 80%;
  background-color: #FFFFFF;
  margin: 0 auto;
}

.find-box-war {
  width: 80%;
  height: 120px;
  margin: 0 auto;
  box-shadow: 1px 2px 3px #888888;
}

.find-box-city {
  height: 50px;
  text-align: center;
  line-height: 65px;
  overflow: hidden;
}

.find-box-city span {
  float: left;
  margin-left: 6px;
  cursor: pointer;
}

.find-box-city-title {
  font-weight: bold;
  font-size: 18px;
}

.find-condition {
  float: left;
  margin-left: 10px;
  width: 130px;
  margin-top: 14px;
}

.find-box-sort {
  height: 56px;
  line-height: 60px;
  margin-top: 4px;
  margin-left: 128px;
}

.find-box-sort-title {
  float: left;
  font-weight: bold;
}

.container {
  width: 80%;
  height: 100vh;
  margin: 0 auto;
}

.search {
  width: 600px;
  /*height: 36px;*/
  border: 2px solid #409eff;
  margin: 0 auto;
}

.search input {
  width: 500px;
  height: 50px;
  padding-left: 10px;
}

.search button {
  width: 90px;
  height: 50px;
  background-color: #409eff;
  font-size: 16px;
  color: #fff;
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
</style>