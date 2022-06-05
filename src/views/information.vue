<template>
  <Header></Header>
  <div class="container">
    <div class="center">
      <div class="list-item" v-for="(item,index) in articleList" :key="index"
           @click="locationFn('/articleDetails?id='+item.id)">
        <div class="item-left"><img :src="item.cover"></div>
        <div class="item-right">
          <h3 class="item-right-title">{{ item.title }}</h3>
          <h4 class="item-right-title">{{ item.subTitle }}</h4>
          <div>
            <span class="item-right-author">作者:{{ item.author }}</span>
            <span class="item-right-time">时间:{{ item.updateTime.substring(0, 10) }}</span>
          </div>
        </div>
      </div>
      <div class="item-pagination">
        <el-pagination
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
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
      pageSize: 5,
      currentPage: 1,
      total: 10,
      articleList: []
    }
  }
  , mounted() {
    this.showArticle();
  }
  , methods: {
    showArticle() {
      const params = new URLSearchParams();
      params.append("pageSize", this.pageSize);
      params.append("pageNum", this.currentPage);
      axios({
        method: 'post',
        url: '/api/selectAllArticle',
        data: params
      }).then((response) => {
        // console.log(response)
        this.articleList = response.data.data.list;
        this.total = response.data.data.total;
        // console.log(this.articleList)
      })
    }
    , handleSizeChange(val) {
      this.pageSize = val;
      this.showArticle();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showArticle();
    }
    , locationFn(url) {
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

.container .center {
  width: 80%;
  height: 100vh;
  margin: 0 auto;
}

.list-item {
  height: 140px;
  display: flex;
  align-content: space-between;
  box-shadow: 2px 2px 2px #888888;
  margin-top: 5px;
  border-left: 4px solid #409eff;
}

.item-left {
  width: 300px;
}

.item-left img {
  width: 290px;
  height: 135px;
}

.item-right {
  flex: 1;
  margin-left: 4px;
}

.item-right-title {
  text-align: left;
  margin-left: 20px;
}

.item-right-author {
  float: left;
  margin-left: 20px;
}

.item-right-time {
  float: right;
  margin-right: 25px;
}

.item-pagination {
  margin-top: 10px;
  margin-left: 290px;
  text-align: center
}
</style>