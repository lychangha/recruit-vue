<template>
  <Header></Header>
  <div style="display: flex">
    <div>
      <el-menu default-active="/hrInfo" class="el-menu-vertical-demo" :router="true">
        <el-menu-item :index="'/hrInfo'">
          <template #title>个人信息</template>
        </el-menu-item>
        <el-menu-item :index="'/pwdSettings'">
          <template #title>账号设置</template>
        </el-menu-item>
        <el-menu-item :index="'/companyInfo'">
          <template #title>公司信息</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div style="flex: 1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
export default {
  components: {Header},
  data() {
    return {

    }
  }
  , mounted() {
  }
  , methods: {}
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>