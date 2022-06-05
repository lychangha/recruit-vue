<template>
  <div class="index">
    <Header></Header>
    <div class="search-box">
      <div class="search">
        <input v-model="title" type="search" placeholder="请输入职位">
        <button @click="locationFn('/searchPosition?title='+title)" type="button">搜索</button>
      </div>
    </div>
    <div style="height: 50px">
      <span style="color: #cccccc">热门职位：</span>
      <el-link :underline="false" class="search-hot">java</el-link>
      <el-link :underline="false" class="search-hot">直播运营</el-link>
      <el-link :underline="false" class="search-hot">Web前端</el-link>
      <el-link :underline="false" class="search-hot">ios</el-link>
      <el-link :underline="false" class="search-hot">架构师</el-link>
      <el-link :underline="false" class="search-hot">公关媒介</el-link>
    </div>
    <div class="main">
      <div class="home">
        <div class="left">
          <el-menu default-active="2" :collapse="true" style="width: 480px">
            <el-sub-menu index="1">
              <template #title>
                <div>
                  <span style="font-weight: bold">技术</span>
                  <span style="margin-left: 20px">Java</span>
                  <span style="margin-left: 20px">PHP</span>
                  <span style="margin-left: 20px">Web前端</span>
                  <span style="margin-left: 20px">算法工程师</span>
                </div>
              </template>
              <el-menu-item index="1-4-1" style="width: 600px;height: 400px">
                <div class="left-little-box">
                  <div class="little-box">
                    <span style="color: #cccccc">后端开发</span><span>Java</span><span>C++</span><span>PHP</span>
                    <span>C</span><span>C#</span><span>Python</span><span>算法工程师</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">移动开发</span><span>HTML5</span><span>Android</span><span>OS</span>
                    <span>移动Web前端</span><span>U3D</span><span>UE4</span><span>Flash开发</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">测试</span><span>测试工程师</span><span>功能测试</span><span>性能测试</span>
                    <span>游戏测试</span><span>硬件测试</span><span>软件测试</span><span>渗透测试</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">运维/技术测试</span><span>运维工程师</span><span>网络工程师</span><span>系统工程师</span>
                    <span>网络安全</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">数据</span><span>ELT工程师</span><span>数据仓库</span><span>数据分析师</span>
                    <span>数据架构师</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">硬件开发</span><span>嵌入式</span><span>自动化</span><span>单片机</span>
                    <span>驱动开发</span><span>FPGA开发</span>
                  </div>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
          <el-menu default-active="2" :collapse="true" style="width: 480px">
            <el-sub-menu index="2">
              <template #title>
                <div>
                  <div>
                    <span style="font-weight: bold">产品</span>
                    <span style="margin-left: 20px">产品经理</span>
                    <span style="margin-left: 20px">产品总监/VP</span>
                    <span style="margin-left: 20px">数据产品经理</span>
                  </div>
                </div>
              </template>
              <el-menu-item index="1-4-1" style="width: 600px;height: 250px">
                <div class="left-little-box">
                  <div class="little-box">
                    <span style="color: #cccccc">产品经理</span><span>产品经理</span><span>网页产品经理</span><span>移动产品经理</span>
                    <span>产品助理</span><span>产品实习生</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">产品设计师</span><span>网页产品设计师</span><span>无线产品设计师</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">高端职位</span><span>产品部经理</span><span>产品总监</span><span>游戏制作人</span>
                  </div>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
          <el-menu default-active="2" :collapse="true" style="width: 480px">
            <el-sub-menu index="3">
              <template #title>
                <div>
                  <span style="font-weight: bold">设计</span>
                  <span style="margin-left: 20px">UI设计师</span>
                  <span style="margin-left: 20px">平面设计师</span>
                  <span style="margin-left: 20px">交互设计师</span>
                </div>
              </template>
              <el-menu-item index="1-4-1" style="width: 600px;height: 300px">
                <div class="left-little-box">
                  <div class="little-box">
                    <span style="color: #cccccc">视觉/交互设计</span><span>视觉设计</span><span>视觉设计师</span><span>UI设计师</span>
                    <span>广告设计师</span><span>多媒体设计师</span><span>动画设计</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">游戏设计</span><span>系统策划</span><span>游戏特效</span><span>游戏角色</span>
                    <span>游戏动作</span><span>游戏数值策划</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">用户研究</span><span>数据分析师</span><span>用户研究员</span><span>UX设计师</span>
                    <span>用户研究经理</span><span>用户研究总监</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">非视觉设计</span><span>非视觉设计</span><span>照明设计</span><span>工业设计</span>
                    <span>家具设计</span><span>室内设计</span>
                  </div>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
          <el-menu default-active="2" :collapse="true" style="width: 480px">
            <el-sub-menu index="4">
              <template #title>
                <div>
                  <span style="font-weight: bold">运营</span>
                  <span style="margin-left: 20px">新媒体运营</span>
                  <span style="margin-left: 20px">产品运营</span>
                  <span style="margin-left: 20px">网络推广</span>
                </div>
              </template>
              <el-menu-item index="1-4-1" style="width: 600px;height: 300px">
                <div class="left-little-box">
                  <div class="little-box">
                    <span style="color: #cccccc">运营</span><span>用户运营</span><span>产品运营</span><span>活动运营</span>
                    <span>游戏运营</span><span>新媒体运营</span><span>社区运营</span><span>直播运营</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">编辑</span><span>编辑</span><span>主编/副主编</span><span>文案编辑</span>
                    <span>网站编辑</span><span>采编</span><span>医学编辑</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">客服</span><span>售前客服</span><span>售后客服</span><span>网络客服</span>
                    <span>客服经理</span><span>客服专员</span><span>电话客服</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">高端运营职位</span><span>高端运营职位</span><span>运营总监</span><span>COO</span>
                    <span>客服总监</span><span>运营经理/主管</span>
                  </div>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
          <el-menu default-active="2" :collapse="true" style="width: 480px">
            <el-sub-menu index="5">
              <template #title>
                <div>
                  <span style="font-weight: bold">人事/财务/行政</span>
                  <span style="margin-left: 20px">人力资源专员/助理</span>
                  <span style="margin-left: 20px">行政主管</span>
                  <span style="margin-left: 20px">财务</span>
                  <span style="margin-left: 20px">审计</span>
                </div>
              </template>
              <el-menu-item index="1-4-1" style="width: 600px;height: 300px">
                <div class="left-little-box">
                  <div class="little-box">
                    <span style="color: #cccccc">人力资源</span><span>招聘</span><span>HRBP</span><span>培训</span>
                    <span>人力资源VP/CHO</span><span>人力资源总监#</span><span>员工关系</span><span>组织发展</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">行政</span><span>行政专员/助理</span><span>前台</span><span>经理助理</span>
                    <span>后勤</span><span>行政主管/经理</span><span>行政总监</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">财务</span><span>工程会计</span><span>税务外勤会计</span><span>统计员</span>
                    <span>财务</span><span>出纳</span><span>税务</span><span>审计</span><span>财务主管/经理</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">法务</span><span>法务专员/助理</span><span>律师</span><span>法律顾问</span>
                    <span>法务经理/主管</span><span>法务总监</span>
                  </div>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
          <el-menu default-active="2" :collapse="true" style="width: 480px">
            <el-sub-menu index="6">
              <template #title>
                <div>
                  <span style="font-weight: bold">金融</span>
                  <span style="margin-left: 20px">投资经理</span>
                  <span style="margin-left: 20px">风控</span>
                  <span style="margin-left: 20px">证券/基金/期货</span>
                </div>
              </template>
              <el-menu-item index="1-4-1" style="width: 650px;height: 400px">
                <div class="left-little-box">
                  <div class="little-box">
                    <span style="color: #cccccc">证券/基金/期货</span><span>买方分析师</span><span>基金经理</span><span>投资银行业务</span>
                    <span>证券/基金/期货</span><span>卖方分析师</span><span>债券交易员</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">投融资</span><span>投资经理</span><span>资产管理</span><span>投资总监</span>
                    <span>投资合伙人</span><span>投后管理</span><span>投资顾问</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">银行</span><span>分析师</span><span>柜员</span><span>商务渠道</span>
                    <span>大堂经理</span><span>客户经理</span><span>信贷管理</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">保险</span><span>保险精算师</span><span>保险理赔</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">中后台</span><span>风控</span><span>法务</span><span>资信评估</span>
                    <span>合规稽查</span><span>清算</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">互联网金融</span><span>互联网金融</span><span>金融产品经理</span><span>催收员</span>
                    <span>分析师</span><span>投资经理</span><span>清算</span>
                  </div>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
          <el-menu default-active="2" :collapse="true" style="width: 480px">
            <el-sub-menu index="7">
              <template #title>
                <div>
                  <span style="font-weight: bold">游戏</span>
                  <span style="margin-left: 20px">小游戏开发</span>
                  <span style="margin-left: 20px">U3D</span>
                  <span style="margin-left: 20px">游戏策划</span>
                  <span style="margin-left: 20px">游戏运营</span>
                </div>
              </template>
              <el-menu-item index="1-4-1" style="width: 600px;height: 300px">
                <div class="left-little-box">
                  <div class="little-box">
                    <span style="color: #cccccc">技术开发</span><span>H5游戏开发</span><span>游戏后端开发</span>
                    <span>C++游戏开发</span><span>COCOS2D-X</span><span>U3D</span><span>游戏测试</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">产品策划</span><span>游戏制作人</span><span>游戏产品经理</span><span>游戏策划</span>
                    <span>剧情设计</span><span>游戏文案</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">运营/推广</span><span>游戏运营</span><span>游戏编辑</span><span>游戏推广</span>
                    <span>手游推广</span><span>页游推广</span>
                  </div>
                  <div class="little-box">
                    <span style="color: #cccccc">其他</span><span>游戏主播</span><span>游戏陪练</span><span>游戏体验</span>
                    <span>电竞主持</span><span>电竞讲师</span>
                  </div>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
        <div class="right">
          <el-carousel v-if="articleList[0]" height="400px">
            <el-carousel-item v-for="(item,index) in articleList" :key="index">
              <img @click="locationFn('/articleDetails?id='+item.id)" style="height: 400px;width: 100%"
                   :src="item.cover">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="job-list">
        <el-tabs class="demo-tabs" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane @click="hotClick" label="热门职位" name="first">
            <div class="positions">
              <div class="box-position-item" v-for="(item, index) in positionList" :key="index"
                   @click="locationFn('/details?id='+item.id)">
                <div class="item-top">
                  <div class="item-top-title">{{ item.title }}</div>
                  <div class="item-top-salary">{{ item.salaryDown }}-{{ item.salaryUp }}k</div>
                  <div class="item-top-info">{{ item.city }}|{{ item.experience }}|{{ item.degree }}</div>
                </div>
                <el-divider></el-divider>
                <div class="item-bottom">
                  <div style="float: left;">
                    <img class="item-bottom-img" :src="item.resourceManReq.company.image" alt="">
                  </div>
                  <div class="item-bottom-company">
                    <span class="company-name">{{ item.resourceManReq.company.name }}</span>
                    <span class="company-info">{{ item.resourceManReq.company.industry }}</span>
                    <span>|</span>
                    <span class="company-info">{{ item.resourceManReq.company.type }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane @click="recentClick" label="最新职位" name="second">
            <div class="positions">
              <div class="box-position-item" v-for="(item, index) in positionList" :key="index"
                   @click="locationFn('/details?id='+item.id)">
                <div class="item-top">
                  <div class="item-top-title">{{ item.title }}</div>
                  <div class="item-top-salary">{{ item.salaryDown }}-{{ item.salaryUp }}k</div>
                  <div class="item-top-info">{{ item.city }}|{{ item.experience }}|{{ item.degree }}</div>
                </div>
                <el-divider></el-divider>
                <div class="item-bottom">
                  <div style="float: left;">
                    <img class="item-bottom-img" :src="item.resourceManReq.company.image" alt="">
                  </div>
                  <div class="item-bottom-company">
                    <span class="company-name">{{ item.resourceManReq.company.name }}</span>
                    <span class="company-info">{{ item.resourceManReq.company.industry }}</span>
                    <span>|</span>
                    <span class="company-info">{{ item.resourceManReq.company.type }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
<!--      <div class="link-box">-->
<!--        <el-tabs class="demo-tabs" @tab-click="linkClick">-->
<!--          <el-tab-pane label="热门城市" name="first">-->
<!--          </el-tab-pane>-->
<!--          <el-tab-pane label="热门公司" name="second">热门公司</el-tab-pane>-->
<!--        </el-tabs>-->
<!--      </div>-->
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
      title: "",
      positionList: []
      , searchForm: {
        info: ""
      }
      , activeName: "first"
      , isCollapse: true
      , articleList: []
    }
  }
  , mounted() {
    this.hotClick();
    this.selectArticleByTag();
  }
  , methods: {
    hotClick() {
      axios({
        method: 'post',
        url: '/api/selectByHits',
        data: {}
      }).then((response) => {
        this.positionList = response.data.data;
      })
    }
    , recentClick() {
      axios({
        method: 'post',
        url: '/api/selectByRelease',
        data: {}
      }).then((response) => {
        this.positionList = response.data.data;
      })
    }
    , handleClick(tab, event) {
      if (tab.props.name === 'first') {
        this.hotClick();
      } else if (tab.props.name === 'second') {
        this.recentClick();
      }
    }
    , selectArticleByTag() {
      const params = new URLSearchParams();
      params.append("tag", "0");
      axios({
        method: 'post',
        url: '/api/selectArticleByTag',
        data: params
      }).then((response) => {
        // console.log(response)
        this.articleList = response.data.data;
      })
    }
    , linkClick() {

    }
    , locationFn(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>

.index {
  background-color: #f6f6f8;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100% !important;
}

.search-box {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search {
  width: 590px;
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

.search-hot {
  margin-left: 10px;
  line-height: 55px;
}

.main {
  /*height: 1200px;*/
  /*background-color: #7794;*/
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}

.home {
  height: 400px;
  width: 80%;
  margin: 0 auto;
  /*background-color: #6438;*/
  display: flex;
  justify-content: space-around;
}

.left {
  width: 480px;
  /*background-color: #cccccc;*/
  /*flex: 1;*/
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  box-shadow: 5px 5px 3px #888888;

}

.little-box {
  flex: 1;
}

.little-box span {
  margin-left: 10px;
}

.left-little-box {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}

.right {
  width: 690px;
  background-color: azure;
  box-shadow: 5px 5px 3px #888888;
}

.job-list {
  /*background-color: #ededed;*/
  width: 80%;
  height: 880px;
  margin: 0 auto;
}

.positions {
  margin: 0 auto;
}

.box-position-item {
  background-color: #FFFFFF;
  width: 365px;
  height: 140px;
  margin: 10px 16px 10px 16px;
  float: left;
  box-shadow: 5px 5px 3px #888888;
}

.item-top {
  height: 60px;
  width: 300px;
}

.item-top-title {
  height: 50px;
  line-height: 65px;
  margin-left: 20px;
  float: left
}

.item-top-salary {
  height: 50px;
  width: 200px;
  line-height: 65px;
  float: right;
  margin-right: -87px;
  color: #F34D00;
}

.item-top-info {
  height: 50px;
  line-height: 25px;
  float: left;
  margin-left: 20px;
  font-size: small;
  color: #5a5a5a;
}

.item-bottom-img {
  width: 40px;
  height: 40px;
  margin-top: -16px;
  margin-left: 20px
}

.item-bottom-company {
  line-height: 10px;
  float: left;
  margin-left: 10px;
}

.company-name {
  margin: 0 10px 0 10px;
  font-size: 14px;
}

.company-info {
  margin: 0 10px 0 10px;
  font-size: small;
  color: #5a5a5a;
}

.link-box {
  background-color: beige;
  height: 200px;
  width: 80%;
  margin: 0 auto;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

</style>