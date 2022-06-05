<template>
  <div style="margin-left: 10px">
    <h3 style="text-align: left">应聘者账号管理</h3>
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入用户名" style="float:left;width: 300px;margin-bottom: 5px"></el-input>
      <el-button type="primary" style="margin-left: 5px;float: left" @click="showUserByUsername">查询</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column sortable prop="id" label="ID" width="180"/>
      <el-table-column prop="username" label="用户名" width="180"/>
      <el-table-column prop="nickname" label="昵称"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 10px 0">
      <el-pagination
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      ></el-pagination>
    </div>
  </div>
  <el-dialog title="修改应聘者信息" v-model="dialogFormVisible2">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" disabled/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="form.password"/>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname"/>
      </el-form-item>
      <el-form-item label="邮件" prop="email">
        <el-input v-model="form.email"/>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {

  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"))
      } else if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        return callback(new Error("邮箱格式错误，请重新输入"))
      } else {
        callback()
      }
    }
    return {
      search: null,
      currentPage: 1,
      pageSize: 5,
      total: 10,
      tableData: [],
      form: {},
      dialogFormVisible2: false,
      rules: {
        username: [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ]
        , password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 8, message: '密码长度不能小于8位', trigger: 'blur'}
        ]
        , nickname: [
          {required: true, message: '昵称不能为空', trigger: 'blur'}
        ]
        , email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {validator: checkEmail, trigger: "blur"}
        ]
      }
    }
  }
  , mounted() {
    this.showAllUser();
  }
  , methods: {
    showAllUser() {
      const params = new URLSearchParams();
      params.append("pageSize", this.pageSize);
      params.append("pageNum", this.currentPage);
      axios({
        method: 'post',
        url: '/api/user/selectAllUser',
        data: params
      }).then((response) => {
        this.tableData = response.data.data.list;
        this.total = response.data.data.total;
      })
    },
    showUserByUsername() {
      if (this.search === null) {
        return;
      }
      const params = new URLSearchParams();
      params.append("pageSize", this.pageSize);
      params.append("pageNum", this.currentPage);
      params.append("username", this.search);
      axios({
        method: 'post',
        url: '/api/user/selectByName',
        data: params
      }).then((response) => {
        this.tableData = response.data.data.list;
        this.total = response.data.data.total;
      })
    },
    update() {
      const params = JSON.stringify(this.form);
      axios({
        method: 'post',
        url: '/api/user/updateInfo',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '更新成功'
          });
          router.go(0)
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
        this.showAllUser()
      })
    },
    deleteUser(id){
      const params = new URLSearchParams();
      params.append("id",id);
      axios({
        method: 'post',
        url: '/api/user/deleteById',
        data: params
      }).then((response) => {
        console.log(response);
      })
    },
    handleEdit(index, row) {
      this.dialogFormVisible2 = true;
      this.form = row;
      this.form.password = null;
      // console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.deleteUser(row.id);
        this.showAllUser();
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.showAllUser();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showAllUser();
    }
  }
}
</script>

<style scoped>

</style>