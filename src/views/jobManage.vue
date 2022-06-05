<template>
  <Header></Header>
  <div class="container">
    <div class="up-box">
      <div class="up-box-center">
        <div class="hr-info">
          <div class="hr-info-left">
            <el-avatar class="hr-image" shape="square" :size="90" :src="hrImage"/>
          </div>
          <div class="hr-info-right">
            <div style="color: #FFFFFF">
              <div class="hr-info-name">{{ nickname }}</div>
              <div class="hr-info-department">{{ department }}</div>
              <div class="hr-info-email">{{ email }}</div>
            </div>
          </div>
        </div>
        <div class="company-info">
          <div class="company-info-left">
            <div style="margin-top: 40px;color: #FFFFFF">
              <div class="company-info-name">{{ company.name }}</div>
              <div class="company-info-group">
                <span>{{ company.industry }}</span><span>{{ company.employees }}左右</span><span>{{ company.type }}</span>
              </div>
              <div class="company-address">{{ company.address }}</div>
            </div>
          </div>
          <div class="company-info-right">
            <!--            <el-avatar class="company-image" shape="square" :size="90" :src="company.image" fit="contain"/>-->
            <img class="company-image" :src="company.image" alt="">
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="down-box">
        <div>
          <span class="down-box-title">职位列表</span>
          <el-button class="add-bnt" type="primary" @click="this.dialogFormVisible1 = true">添加职位</el-button>
        </div>
        <div>
          <el-table :data="positionList" stripe border style="width: 88%;">
            <el-table-column prop="title" label="职位名称" width="140"/>
            <el-table-column prop="category.name" label="职位类型" width="120"/>
            <el-table-column prop="degree" label="学历要求" width="120"/>
            <el-table-column prop="experience" label="工作经验" width="120"/>
            <el-table-column prop="salaryDown" label="最低薪资(k)" width="120"/>
            <el-table-column prop="salaryUp" label="最高薪资(k)" width="120"/>
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button type="text" size="small" @click="editPosition(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="open(scope.row)">删除</el-button>
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
      </div>
    </div>
  </div>
  <el-dialog title="发布职位" v-model="dialogFormVisible1">
    <el-form :model="form" label-width="120px">
      <el-form-item label="职位名称">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="职位副标题">
        <el-input v-model="form.subtitle"/>
      </el-form-item>
      <el-form-item label="招聘数量">
        <el-input v-model="form.quantity"/>
      </el-form-item>
      <el-form-item label="学历要求">
        <el-select v-model="form.degree" class="m-2" placeholder="学历要求">
          <el-option value="本科">本科</el-option>
          <el-option value="高中及以下">高中及以下</el-option>
          <el-option value="专科">专科</el-option>
          <el-option value="硕士">硕士</el-option>
          <el-option value="博士">博士</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作经验">
        <el-select v-model="form.experience" class="m-2" placeholder="工作经验">
          <el-option value="不限">不限</el-option>
          <el-option value="在校/应届">在校/应届</el-option>
          <el-option value="3年及以下">3年及以下</el-option>
          <el-option value="3-5年">3-5年</el-option>
          <el-option value="5-10年">5-10年</el-option>
          <el-option value="10年以上">10年以上</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作城市">
        <el-input v-model="form.city"/>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.address"/>
      </el-form-item>
      <el-form-item label="最高薪资">
        <el-input-number v-model="form.salaryUp" :min="form.salaryDown" @change="handleNumAdd"/>
      </el-form-item>
      <el-form-item label="最低薪资">
        <el-input-number v-model="form.salaryDown" :min="1"/>
      </el-form-item>
      <el-form-item label="职位福利">
        <el-input v-model="form.describe"/>
      </el-form-item>
      <el-form-item label="职位工作要求">
        <el-input v-model="form.requirements" :rows="3" type="textarea" placeholder="技术介绍"/>
      </el-form-item>
      <el-form-item label="职位种类" @click="listCategory">
        <el-cascader ref="unitAreacode" @change="handleChangeArea" v-model="form.categoryId" :options="cateList"
                     :props="cateProps" :show-all-levels="false"/>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="addPosition">确 定</el-button>
    </span>
    </template>
  </el-dialog>
  <el-dialog title="修改职位" v-model="dialogFormVisible2">
    <el-form :model="form" label-width="120px">
      <el-form-item label="职位名称">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="职位副标题">
        <el-input v-model="form.subtitle"/>
      </el-form-item>
      <el-form-item label="招聘数量">
        <el-input v-model="form.quantity"/>
      </el-form-item>
      <el-form-item label="学历要求">
        <el-select v-model="form.degree" class="m-2" placeholder="学历要求">
          <el-option value="本科">本科</el-option>
          <el-option value="高中及以下">高中及以下</el-option>
          <el-option value="专科">专科</el-option>
          <el-option value="硕士">硕士</el-option>
          <el-option value="博士">博士</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作经验">
        <el-select v-model="form.experience" class="m-2" placeholder="工作经验">
          <el-option value="不限">不限</el-option>
          <el-option value="在校/应届生">在校/应届生</el-option>
          <el-option value="1-3年">1-3年</el-option>
          <el-option value="3-5年">3-5年</el-option>
          <el-option value="5年以上">5年以上</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作城市">
        <el-input v-model="form.city"/>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.address"/>
      </el-form-item>
      <el-form-item label="最高薪资">
        <el-input-number v-model="form.salaryUp" :min="form.salaryDown" @change="handleNumAdd"/>
      </el-form-item>
      <el-form-item label="最低薪资">
        <el-input-number v-model="form.salaryDown" :min="1"/>
      </el-form-item>
      <el-form-item label="职位福利">
        <el-input v-model="form.describe"/>
      </el-form-item>
      <el-form-item label="职位工作要求">
        <el-input v-model="form.requirements" :rows="3" type="textarea" placeholder="技术介绍"/>
      </el-form-item>
      <el-form-item label="职位种类" @click="listCategory">
        <el-cascader ref="unitAreacode" @change="handleChangeArea" v-model="form.categoryId" :options="cateList"
                     :props="cateProps" :show-all-levels="false"/>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="editSubmit">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import Header from "@/components/header";
import axios from "axios";

export default {
  components: {Header},
  data() {
    return {
      dialogFormVisible1: false
      , dialogFormVisible2: false
      , form: {
        title: ""
        , subtitle: ""
        , quantity: ""
        , degree: ""
        , experience: ""
        , city: ""
        , address: ""
        , salaryUp: 2
        , salaryDown: 1
        , describe: ""
        , requirements: ""
        , hits: 0
        , categoryId: ""
        , resourceManId: ""
      }
      , cateList: []
      , cateProps: {
        value: "id"
        , label: "name"
        , children: "childCategory"
      }
      , pageSize: 5
      , currentPage: 1
      , total: 10
      , nickname: ""
      , hrImage: ""
      , department: ""
      , email: ""
      , company: {}
      , positionList: []
    }
  }
  , mounted() {
    this.showHrInfo();
    this.showCompanyInfo();
    this.showPositionList();
  }
  , methods: {
    showHrInfo() {
      const nickname = sessionStorage.getItem("nickname");
      const hrImage = sessionStorage.getItem("image");
      const department = sessionStorage.getItem("department");
      const email = sessionStorage.getItem("email");
      this.nickname = nickname;
      this.hrImage = hrImage;
      this.department = department;
      this.email = email;
    }
    , showCompanyInfo() {
      const code = sessionStorage.getItem("code");
      const params = new URLSearchParams();
      params.append("code", code);
      axios({
        method: 'post',
        url: '/api/selectCompanyInfo',
        data: params
      }).then((response) => {
        this.company = response.data.data;
        // console.log(this.company)
      })
    }
    , showPositionList() {
      const resourceManId = sessionStorage.getItem("id");
      const params = new URLSearchParams();
      params.append("resourceManId", resourceManId);
      params.append("pageSize", this.pageSize);
      params.append("pageNum", this.currentPage);
      axios({
        method: 'post',
        url: '/api/selectByHr',
        data: params
      }).then((response) => {
        this.positionList = response.data.data.list;
        this.total = response.data.data.total;
      })
    }
    , listCategory() {
      axios({
        method: 'post',
        url: '/api/listCategory',
        data: {}
      }).then((response) => {
        this.cateList = response.data.data;
      })
    }
    , handleChange() {
      this.handleNumAdd();
    }
    , addPosition() {
      const resourceManId = sessionStorage.getItem("id");
      this.form.resourceManId = resourceManId;
      const params = JSON.stringify(this.form);
      console.log(params)
      axios({
        method: 'post',
        url: '/api/addPosition',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        // console.log(response)
        this.showPositionList();
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '发布成功'
          });
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
        this.dialogFormVisible1 = false;
        this.form = {};
      })
    }
    ,editSubmit(){
      const params = JSON.stringify(this.form);
      console.log(params)
      axios({
        method: 'post',
        url: '/api/updatePosition',
        data: params,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        // console.log(response)
        if (response.data.status === 10000) {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        } else {
          this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
        this.dialogFormVisible2 = false;
        this.form = {};
      });
    }
    ,editPosition(row){
      this.dialogFormVisible2 = true;
      this.form = row;
    }
    , open(row) {
      this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.deletePosition(row)
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
    }
    ,deletePosition(row){
      console.log(row)
      const id = row.id;
      const params = new URLSearchParams();
      params.append("id",id);
      axios({
        method: 'post',
        url: '/api/deletePosition',
        data: params
      }).then((response) => {
        console.log(response);
        this.showPositionList();
      })
    }
    , cancel() {
      this.dialogFormVisible1 = false;
      this.dialogFormVisible2 = false;
      this.form = {}
    }
    , handleSizeChange(val) {
      this.pageSize = val;
      this.showPositionList();
    }
    , handleCurrentChange(val) {
      this.currentPage = val;
      this.showPositionList();
    }
    , handleNumAdd() {
      if (this.form.salaryUP < this.form.salaryDown) {
        this.form.salaryUP = this.form.salaryDown + 1;
      }
    }
    , handleChangeArea(val) {
      this.form.categoryId = val[val.length - 1]
      console.log(this.form.categoryId);
      // console.log(this.$refs.unitAreacode.getCheckedNodes()[0].pathLabels);
      // this.$refs.unitAreacode.setCheckedNodes()[0].pathLabels
      // console.log(val[val.length-1])
    },
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #ededed;
  margin: 0 auto;
}

.up-box {
  background-color: #6b778c;
  height: 150px;
}

.up-box-center {
  width: 64%;
  height: 300px;
  margin: 0 auto;
}

.hr-info {
  float: left;
  width: 480px;
  height: 150px;
  display: flex;
}

.hr-info-left {
  flex: 0 0 180px;
  height: 150px;
}

.hr-image {
  margin: 35px 0 25px 0
}

.hr-info-right {
  flex: 1;
  height: 150px;
  display: flex;
  align-items: center;
}

.hr-info-name {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin: 6px 0 6px 0;
}

.hr-info-department {
  text-align: left;
  font-size: 14px;
  margin: 6px 0 6px 0;
}

.hr-info-email {
  text-align: left;
  font-size: 16px;
  margin: 6px 0 0 0;
}

.company-info {
  float: right;
  width: 480px;
  height: 150px;
  display: flex;
}

.company-info-left {
  flex: 0 0 300px;
  height: 150px;
}

.company-info-name {
  text-align: right;
  font-size: 24px;
  font-weight: bold;
  margin: 6px 0 6px 0;
}

.company-info-group {
  text-align: right;
  font-size: 14px;
  margin: 6px 0 6px 0;
}

.company-address {
  text-align: right;
  font-size: 16px;
  margin: 6px 0 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.company-info-group span {
  margin-left: 20px;
}

.company-info-right {
  flex: 1;
  height: 150px;
}

.company-image {
  margin: 35px 0 25px 0;
  width: 87px;
  height: 87px;
  border-radius: 10px 10px 10px 10px;
}

.down-box {
  width: 64%;
  height: 580px;
  background-color: #FFFFFF;
  margin: 0 auto;
}

.down-box-title {
  float: left;
  margin-left: 30px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}

.add-bnt {
  float: right;
  margin-right: 30px;
  margin-top: 10px;
}
</style>