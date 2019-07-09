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
  <div>
    <el-table 
    :data="tableData" 
    style="width: 100%"
    border>
     <el-table-column type="index" prop="" label="序列" width="60" align="center"></el-table-column>
     <el-table-column prop="Name" label="用户名" align="center"></el-table-column>
     <el-table-column prop="Nickname" label="用户昵称" align="center"></el-table-column>
     <el-table-column prop="Phone" label="联系电话" align="center"></el-table-column>
     <el-table-column prop="Email" label="邮箱地址" align="center"></el-table-column>
     <el-table-column prop="LoginTimes" label="登录次数" min-width="40" align="center"></el-table-column>
     <el-table-column prop="AddTime" label="添加时间" min-width="90" align="center">
       <template slot-scope="scope">
         <i class="el-icon-time"></i>
         <span style="margin-left: 10px">{{ scope.row.AddTime }}</span>
       </template>
     </el-table-column>
     <el-table-column prop="LastLoginTime" label="最后登录时间" min-width="90" align="center">
       <template slot-scope="scope"> 
         <i class="el-icon-time"></i>
         <span style="margin-left: 10px">{{ scope.row.LastLoginTime }}</span>
       </template>
     </el-table-column>
     <el-table-column prop="LastLoginIP" label="最后一次登录IP" min-width="90" align="center"> 
     </el-table-column>
      <el-table-column prop="LastLoginTime" label="操作" align="center">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="editdata(scope.row.Id,0)">编辑</el-button>
     </el-table-column>
    </el-table>
    <el-pagination
      class="page-div"
      layout="total, sizes , prev, pager, next, jumper"
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
.page-div{
  margin-top: 10px;
  float:left;
}
</style>

<script>
export default {
  data(){
    return{
      tableData:[{}],//菜单表格数据
      pageModel:{
        pageSize: 10,
        curPage: 1,
      },
    }
  },
  created(){
    this.GetManagerList();
  },
  methods:{
    GetManagerList:function(){
      this.$api.manager.getmanagerList(this.pageModel).then(res => {
        if(res.ResultCode == 200)
        {
           this.tableData = res.ResultData.data;
           this.pageModel= res.ResultData.pageModel;
        }
      })
    },
    handleSizeChange(val) {//改变每页数量触发方法
      this.pageModel.pageSize=val,
      this.GetManagerList();
    },
    handleCurrentChange(val) {//点击上/下一页触发方法
      this.pageModel.curPage=val,
      this.GetManagerList();
    }
  }
}
</script>

