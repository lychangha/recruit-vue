<template>
  <div class="header">
    <div class="logo">后台管理</div>
    <div class="user-dropdown">
      <el-dropdown>
        <span class="el-dropdown-link unick">{{ name }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="">个人信息</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <div style="display: flex">
    <div>
      <el-menu  class="el-menu-vertical-demo" :router="true">
        <el-sub-menu index="1">
          <template #title>账号管理</template>
          <el-menu-item :index="'/userAccount'">
            <template #title>应聘者账号管理</template>
          </el-menu-item>
          <el-menu-item :index="'/hrAccount'">
            <template #title>招聘者账号管理</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>文章管理</template>
          <el-menu-item :index="'/article'">
            <template #title>文章管理</template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>分类管理</template>
          <el-menu-item :index="'/classification'">
            <template #title>职位分类管理</template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div style="flex: 1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: ""
    }
  }
  , mounted() {
    this.isLogin();
  }
  , methods: {
    isLogin() {
      const name = sessionStorage.getItem("name");
      this.name = name;
    },
    logout() {
      axios({
        method: 'post',
        url: '/api/admin/logout',
        data: {}
      }).then((response) => {
        sessionStorage.clear();
        this.isLogin();
        this.$message({
          type: 'success',
          message: '成功退出'
        });
        this.locationFn("/admin/login");
      })
    },
    locationFn(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.header {
  height: 64px;
  background-color: black;
  padding-left: 50px;
  box-shadow: 0px 12px 24px 0px rgba(28, 31, 33, 0.1);
}

.logo {
  width: 200px;
  line-height: 64px;
  font-weight: bold;
  font-size: 20px;
  color: dodgerblue;
  float: left
}

.user-dropdown {
  width: 200px;
  float: right;
  margin-right: 30px;
}

.unick {
  line-height: 64px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>