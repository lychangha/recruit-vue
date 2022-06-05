<template>
  <div style="margin-left: 10px">
    <h3 style="text-align: left">招聘者账号管理</h3>
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入用户名" style="float:left;width: 300px;margin-bottom: 5px"></el-input>
      <el-button type="primary" style="margin-left: 5px;float: left" @click="showHrByUsername">查询</el-button>
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
          :total="total">
      </el-pagination>
    </div>
  </div>
  <el-dialog title="修改招聘者信息" v-model="dialogFormVisible3">
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
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="部门职位" prop="department">
        <el-input v-model="form.department"/>
      </el-form-item>
      <el-form-item label="唯一编码" prop="code">
        <el-input v-model="form.code"/>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible3 = false">取 消</el-button>
      <el-button type="primary" @click="updateHrInfo">确 定</el-button>
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
      search:"",
      dialogFormVisible3: false,
      currentPage: 1,
      pageSize: 5,
      total: 10,
      tableData: [],
      form: {},
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
        , phone: [
          {required: true, message: '电话不能为空', trigger: 'blur'}
        ]
        , department: [
          {required: true, message: '部门/职位不能为空', trigger: 'blur'}
        ]
      }
    }
  }
  , mounted() {
    this.showAllHr();
  }
  , methods: {
    showAllHr() {
      const params = new URLSearchParams();
      params.append("pageSize", this.pageSize);
      params.append("pageNum", this.currentPage);
      axios({
        method: 'post',
        url: '/api/resource_man/showAllHr',
        data: params
      }).then((response) => {
        this.tableData = response.data.data.list;
        this.total = response.data.data.total;
      })
    },
    showHrByUsername() {
      if (this.search === null) {
        return;
      }
      const params = new URLSearchParams();
      params.append("pageSize", this.pageSize);
      params.append("pageNum", this.currentPage);
      params.append("username", this.search);
      axios({
        method: 'post',
        url: '/api/resource_man/selectByName',
        data: params
      }).then((response) => {
        console.log(response)
        this.tableData = response.data.data.list;
        this.total = response.data.data.total;
      })
    },
    updateHrInfo() {
      const params = JSON.stringify(this.form);
      axios({
        method: 'post',
        url: '/api/resource_man/updateHrInfo',
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
        this.showAllHr();
      })
    },
    deleteHr(id){
      const params = new URLSearchParams();
      params.append("id",id);
      axios({
        method: 'post',
        url: '/api/resource_man/deleteHrById',
        data: params
      }).then((response) => {
        console.log(response);
      })
    },
    handleEdit(index, row) {
      // console.log(index, row)
      this.dialogFormVisible3 = true;
      this.form = row;
      this.form.password = null;
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.deleteHr(row.id);
        this.showAllHr();
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
      this.showAllHr();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showAllHr();
    }
  }
}
</script>

<style scoped>

</style>