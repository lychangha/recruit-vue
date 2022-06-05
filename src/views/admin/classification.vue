<template>
  <div style="margin-left: 10px">
    <h3 style="text-align: left">职位分类管理</h3>
    <div style="width: 90px;">
      <el-button @click="dialogFormVisible1 = true" style="margin-left: 2px;margin-bottom: 4px" type="primary">新增分类</el-button>
    </div>
  </div>
  <div >
    <el-table
        :data="tableData"
        style="width: 80%;margin-bottom: 20px;"
        row-key="id"
        border
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="expandSelect"
        :tree-props="{children: 'childCategory', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="ID" sortable width="180"/>
      <el-table-column prop="name" label="名称" width="180"/>
      <el-table-column prop="type" label="级别" width="180"></el-table-column>
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
  <el-dialog width="400px" title="新增分类" v-model="dialogFormVisible1">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入分类名称"/>
      </el-form-item>
      <el-form-item label="分类级别" prop="type">
        <el-select v-model="form.type" class="m-2" placeholder="请选择分类级别">
          <el-option value="1">1</el-option>
          <el-option value="2">2</el-option>
          <el-option value="3">3</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级类别ID">
        <el-input v-model="form.parentId" placeholder="请输入上一级类别ID,一级类别ID为0"/>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="addCategory">确 定</el-button>
    </span>
    </template>
  </el-dialog>
  <el-dialog width="400px" title="编辑分类" v-model="dialogFormVisible2">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入分类名称"/>
      </el-form-item>
      <el-form-item label="分类级别" prop="type">
        <el-select v-model="form.type" class="m-2" placeholder="请选择分类级别">
          <el-option value="1">1</el-option>
          <el-option value="2">2</el-option>
          <el-option value="3">3</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级类别ID">
        <el-input v-model="form.parentId" placeholder="请输入上一级类别ID,一级类别ID为0"/>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialogFormVisible1:false,
      dialogFormVisible2:false,
      currentPage: 1,
      pageSize: 20,
      total: 10,
      expands: [],
      tableData: [],
      getRowKeys(row) {
        return row.id;
      },
      form:{}
    }
  }
  , mounted() {
    this.showAllCategory();
  }
  , methods: {
    showAllCategory() {
      const params = new URLSearchParams();
      params.append("pageSize", this.pageSize);
      params.append("pageNum", this.currentPage);
      axios({
        method: 'post',
        url: '/api/admin/listCategoryForAdmin',
        data: params
      }).then((response) => {
        console.log(response)
        this.tableData = response.data.data.list;
        this.total = response.data.data.total;
        this.pageSize = this.total;
      })
    },
    addCategory(){
      const params = JSON.stringify(this.form);
      axios({
        method: 'post',
        url: '/api/admin/addCategory',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '新增成功'
          });
          this.showAllCategory();
          this.dialogFormVisible1 = false;
          this.form = {};
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      });
    },
    update(){
      const params = JSON.stringify(this.form);
      axios({
        method: 'post',
        url: '/api/admin/updateCategory',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          this.showAllCategory();
          this.dialogFormVisible2 = false;
          this.form = {};
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      });
    },
    delete(id){
      const params = new URLSearchParams();
      params.append("id", id);
      axios({
        method: 'post',
        url: '/api/admin/deleteCategory',
        data: params
      }).then((response) => {
        console.log(response);
      })
    },
    handleEdit(index, row) {
      // console.log(index, row)
      this.dialogFormVisible2 = true;
      this.form = row;
    },
    handleDelete(index, row) {
      // console.log(index, row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.delete(row.id);
        this.showAllCategory();
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
    expandSelect(row, expandedRows) {
      console.log(row)
      console.log(expandedRows)
      if (expandedRows) {
        this.expands.push(row.id)
      } else {
        this.expands = [];
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.showAllCategory();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showAllCategory();
    }
    ,cancel(){
      this.dialogFormVisible1 = false;
      this.dialogFormVisible2 = false;
      this.form = {};
    }
  }
}
</script>

<style scoped>


</style>