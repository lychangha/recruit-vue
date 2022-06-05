<template>
  <Header></Header>
  <div class="box">
    <div class="container">
      <div class="center">
        <div class="article-title">{{ title }}</div>
        <div class="article-info">
          <div class="article-info-subTitle">{{ subTitle }}</div>
          <div class="article-info-right">
            <span class="article-info-author">作者: {{ author }}</span>
            <span class="article-info-author">时间: {{ updateTime }}</span>
          </div>
        </div>
        <div class="article-info-description" v-html="description"></div>
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
      title: "",
      subTitle: "",
      author: "",
      description: "",
      updateTime: ""
    }
  }
  , mounted() {
    this.initData();
  }
  , methods: {
    initData() {
      let id = window.location.search.split('=')[1];
      const params = new URLSearchParams();
      params.append("id", id)
      axios({
        method: 'post',
        url: '/api/selectArticleById',
        params
      }).then((response) => {
        console.log(response);
        this.title = response.data.data.title;
        this.subTitle = response.data.data.subTitle;
        this.author = response.data.data.author;
        this.description = response.data.data.description;
        this.updateTime = response.data.data.updateTime.substring(0, 10);
      });
    }
  }
}
</script>

<style scoped>
.box {
  background-color: #ededed;
  min-height: 100vh;
  width: 100%;
  display: flex;
}

.container {
  width: 64%;
  background-color: #FFFFFF;
  margin: 0 auto;
}

.container .center {
  width: 90%;
  margin: 0 auto
}

.article-title {
  text-align: left;
  margin-left: 25px;
  font-size: 30px;
  font-weight: bold;
  line-height: 55px;
}

.article-info {
  display: flex;
  margin-top: 10px;
  color: #8c939d;
  font-size: 14px;
}

.article-info-subTitle {
  width: 50%;
  text-align: left;
  margin-left: 25px;
}

.article-info-right {
  flex: 1;
  text-align: right;
}

.article-info-author {
  margin-right: 20px;
}
.article-info-description{
  margin-left: 25px;
}
</style>