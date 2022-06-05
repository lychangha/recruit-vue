<template>
  <div style="margin-left: 10px">
    <h3 style="text-align: left">资讯文章管理</h3>
    <div style="margin: 10px 0">
      <el-button type="primary" style="margin-left: 5px;float: left" @click="dialogFormVisible3 = true">新增</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column sortable prop="id" label="ID" width="180"/>
        <el-table-column prop="title" label="标题" width="180"/>
        <el-table-column prop="author" label="作者"/>
        <el-table-column prop="tag" label="展示标记"/>
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
  </div>
  <div>
    <el-dialog title="新增资讯文章" v-model="dialogFormVisible3">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="题目" prop="username">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="副标题" prop="author">
          <el-input v-model="form.subTitle"/>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"/>
        </el-form-item>
        <el-form-item label="展示标记" prop="tag">
          <el-input v-model="form.tag"/>
        </el-form-item>
        <el-form-item label="正文" prop="description">
          <wang-editor :content-html="form.description" v-on:getWangEditorValue="getWangEditorValue"></wang-editor>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="load">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="修改资讯文章" v-model="dialogFormVisible4">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="题目" prop="username">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="副标题" prop="author">
          <el-input v-model="form.subTitle"/>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"/>
        </el-form-item>
        <el-form-item label="展示标记" prop="tag">
          <el-input v-model="form.tag"/>
        </el-form-item>
        <el-form-item label="正文" prop="description">
        <wang-editor :content-html="form.description" v-on:getWangEditorValue="getWangEditorValue"></wang-editor>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import WangEditor from "@/components/WangEditor";
import axios from "axios";
import router from "@/router";


export default {
  components: {WangEditor},
  data() {
    return {
      currentPage:1,
      pageSize:5,
      total:10,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      form: {
        name: "",
        description: ""
      },
      tableData: [],
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
        this.tableData = response.data.data.list;
        this.total = response.data.data.total;
      })
    }
    , load() {
      const params = JSON.stringify(this.form);
      axios({
        method: 'post',
        url: '/api/addArticle',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        console.log(response);
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '新增成功'
          });
          this.dialogFormVisible3 = false;
          router.go(0);
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      })
    }
    ,update(){
      const params = JSON.stringify(this.form);
      axios({
        method: 'post',
        url: '/api/updateArticle',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        console.log(response);
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          this.dialogFormVisible4 = false;
          router.go(0);
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      })
    }
    , getWangEditorValue(str) {
      this.form.description = str;
    }
    , cancel() {
      this.dialogFormVisible3 = false;
      this.dialogFormVisible4 = false;
      // this.form = {};
      router.go(0)

    }
    ,deleteArticle(id){
      const params = new URLSearchParams();
      params.append("id",id);
      axios({
        method: 'post',
        url: '/api/deleteArticle',
        data: params
      }).then((response) => {
        console.log(response);
      })
    }
    , handleEdit(index, row) {
      // console.log(index, row);
      this.dialogFormVisible4 = true;
      this.form = row;

    }
    , handleDelete(index, row) {
      // console.log(index, row)
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.deleteArticle(row.id);
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        this.showArticle();
        router.go(0);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    }
    ,handleSizeChange(val) {
      this.pageSize = val;
      this.showArticle();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showArticle();
    }
  }
}
</script>

<style scoped>
.editor {
  margin-top: -1px;
  border: 1px solid #ccc;
  min-height: 400px;
  height: auto;
}
</style>