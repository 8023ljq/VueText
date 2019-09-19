<template>
<div>
  <div class="Inquire">
   <el-row>
    <el-col :span="4">   
      <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="pageModel.Keyword"></el-input>
    </el-col>
    <el-col :span="4">   
      <el-button size="medium" type="primary" icon="el-icon-search" @click="getManagerList()">搜索</el-button>
      <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="addDialog()">添加</el-button>
     
    </el-col>
   </el-row>
  </div>
  <div>
    <el-table 
    :data="tableData" 
    style="width: 100%"
    border>
     <el-table-column type="index" prop="" label="序列" width="60" align="center"></el-table-column>
     <el-table-column prop="RoleName" label="角色名称" align="center"></el-table-column>
     <!-- <el-table-column prop="RoleTypeStr" label="角色类型" align="center"></el-table-column> -->
     <!-- <el-table-column prop="Phone" label="是否默认" align="center"></el-table-column> -->
     <el-table-column prop="AddUserName" label="添加人" align="center"></el-table-column>
     <el-table-column prop="AddTime" label="添加时间" min-width="90" align="center">
        <template slot-scope="scope">
         <i class="el-icon-time"></i>
         <span style="margin-left: 10px">{{ scope.row.AddTime }}</span>
       </template>
     </el-table-column>
     <el-table-column prop="Remarks" label="备注" min-width="90" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
       <template slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="editdata(scope.row.Id,0)">编辑</el-button>
        <el-button type="success" size="mini" v-if="scope.row.IsDelete" icon="el-icon-circle-check" @click="disOrEnaManager(scope.row.Id)">启用</el-button>
        <el-button type="danger" size="mini" v-else icon="el-icon-circle-close" @click="disOrEnaManager(scope.row.Id)">停用</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRole(scope.row.Id)">删除</el-button>
       </template> 
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
      :total="pageModel.count"
      :page-sizes="[100, 200, 300, 400]">
    </el-pagination>
  </div>
  <!-- 弹出框 -->
      <el-dialog :title="titlename" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :center="false" width="40%">
        <el-form ref="form" :model="dialogform" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="角色名称" required>
                <el-input v-model="dialogform.RoleName"></el-input>
              </el-form-item>
            </el-col>
           <!-- <el-col :span="12">
              <el-form-item label="是否启用" required>
                <el-switch
                  v-model="dialogform.IsDelete"
                  active-color="#ff4949"
                  inactive-color="#13ce66">
                </el-switch>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogform.Remarks"></el-input>
          </el-form-item>
          <el-form-item label="权限">
          <el-tree ref="tree"
            :data="routesData"
            :props="defaultProps"
            :default-checked-keys="dialogform.SelectedArray"
            show-checkbox
            default-expand-all
            node-key="id"
            class="permission-tree"
            highlight-current/>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="addNewRole()" size="medium">确 定</el-button>
        </div>
      </el-dialog>
         <!-- <el-drawer
  title="我是标题"
  direction="rtl"
  size="20%"
  :wrapperClosable="false"
  :append-to-body="true"
  :close-on-press-escape="false"
  :visible.sync="drawer"
  > <span>我来啦!</span>
</el-drawer> -->
  <!-- :before-close="handleClose" -->
 
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
  float:right;
}
.el-dialog__title {
  float: left;
}
.el-select{
  display: block;
}
.el-cascader{
  width: 100% !important;
}
.el-switch{
  float: left;
  height: 40px;
}
</style>

<script>
export default {
  data(){
    return{
      routesData:[{}],
      tableData:[{}],//菜单表格数据
      pageModel:{
        pageSize: 10,
        curPage: 1,
        Keyword:'',
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogform:{
        RoleName:"",
        IsDelete:false,
        Remarks:"",
        SelectedArray:[],
      },
      dialogFormVisible:false,
      titlename:"",
      drawer:false,
    }
  },
  created(){
    this.getManagerList()
    this.getmanager()
  },
  methods:{
    getManagerList:function(){
      this.$api.manager.getmanagerrolelist(this.pageModel).then(res => {
        if(res.ResultCode == 200)
        {
           this.tableData = res.ResultData.data;
           this.pageModel= res.ResultData.pageModel;
        }
      })
    },
    handleSizeChange(val) {//改变每页数量触发方法
      this.pageModel.pageSize=val,
      this.getManagerList();
    },
    handleCurrentChange(val) {//点击上/下一页触发方法
      this.pageModel.curPage=val,
      this.getManagerList();
    },
    addDialog(){
      this.dialogFormVisible=true,
      this.titlename="添加角色"
    },
    editdata(roleId){//编辑角色获取当前角色信息
      this.dialogFormVisible=true,
      this.titlename="编辑角色",
       this.$api.manager.selectrolemodel(roleId).then(res=>{
        this.dialogform=res.ResultData.Model
        this.dialogform.SelectedArray= res.ResultData.RoleArray
        //this.$message({ message: res.ResultData.RoleArray, type: res.ResultType })
      })
    },
    getmanager(){//获取所有菜单集合
      this.$api.common.findNavTree().then(res=>{
        this.routesData=addSelectMenu(res.ResultData.data);
      })
    },
    deleteRole(roleId) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addNewRole(){//添加角色信息
       this.dialogform.SelectedArray= this.$refs.tree.getCheckedKeys()
       this.$api.manager.addnewrole(this.dialogform).then(res=>{
          this.$message({ message: res.ResultMsgs, type: res.ResultType })
          if(res.ResultCode == 200){
            this.dialogFormVisible=false
            this.getManagerList()
          }
      })
    }
  }
}

/**
* 级联下拉数据
* @param {*} menuList 菜单列表
*/
function addSelectMenu(menuList){
  const result = []
  for(var i=0;i<menuList.length;i++){
    const id= menuList[i].GuId
    const label= menuList[i].FullName
    let children=menuList[i].children
     
    if(children){
      children=addSelectMenu(children)
    }

    result.push({
      id,
      label,
      children
    })
  }
  return result
}
</script>

