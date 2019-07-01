<template>
<div>
  <div class="Inquire">
   <el-row>
    <el-col :span="4">   
      <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
    </el-col>
    <el-col :span="4">   
      <el-button size="medium" type="primary" icon="el-icon-search">搜索</el-button>
    </el-col>
   </el-row>
  </div>
  <div class="el-table">
    <el-table 
    :data="tableData" 
    style="width: 100%"
    border>
     <el-table-column prop="Name" label="用户名"></el-table-column>
     <el-table-column prop="LoginTimes" label="登录次数"></el-table-column>
     <el-table-column  label="添加时间">
       <template slot-scope="scope">
         <i class="el-icon-time"></i>
         <span style="margin-left: 10px">{{ scope.row.AddTime }}</span>
       </template>
     </el-table-column>
     <el-table-column prop="LastLoginTime" label="最后登录时间">
       <template slot-scope="scope"> 
         <i class="el-icon-time"></i>
         <span style="margin-left: 10px">{{ scope.row.LastLoginTime }}</span>
       </template>
     </el-table-column>
    </el-table>
    <el-pagination
      layout="total, prev, pager, next, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="pageModel.pageSize"
      :current-page="pageModel.curPage"
      :total="pageModel.count">
    </el-pagination>
     <!-- :page-sizes="[100, 200, 300, 400]" -->
  </div>
</div>
</template>

<style>
.Inquire {
  width: 100%;
  height: 65px;
  line-height: 65px;
  /* background-color: red; */
}
</style>

<script>
export default {
  data(){
    return{
      tableData:[{}],//菜单表格数据
      pageModel:{},
    }
  },
  created(){
    this.GetManagerList();
  },
  methods:{
    GetManagerList:function(){
      debugger
      this.$api.manager.getmanagerList().then(res => {
        this.tableData = res.ResultData.data;
        this.pageModel= res.ResultData.pageModel;
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

