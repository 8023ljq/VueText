<template>
<div>
  <div class="Inquire">
   <el-row>
    <el-col :span="4">   
      <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="pageModel.Keyword"></el-input>
    </el-col>
    <el-col :span="4">   
      <el-button size="medium" type="primary" icon="el-icon-search" @click="getManagerRolList()">搜索</el-button>
      <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="addDialog('dataform')">添加</el-button>
     
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
      <el-table-column label="操作" width="400" align="center">
       <template slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="editData(scope.row.Id,0)">编辑</el-button>
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="editPurview(scope.row.Id)">权限</el-button>
        <el-button type="success" size="mini" v-if="scope.row.IsLocking" icon="el-icon-circle-check" @click="disOrEnaManager(scope.row.Id,1)">启用</el-button>
        <el-button type="danger" size="mini" v-else icon="el-icon-circle-close" @click="disOrEnaManager(scope.row.Id,2)">停用</el-button>
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
  <!-- 编辑角色弹出框 -->
      <el-dialog :title="titlename" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :center="false" width="40%">
        <el-form ref="dataform" :model="dialogform" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="角色名称" prop="RoleName" required>
                <el-input v-model="dialogform.RoleName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" prop="Remarks">
            <el-input type="textarea" v-model="dialogform.Remarks"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" v-if="isAdd" @click="addNewRole()" size="medium">提 交</el-button>
          <el-button type="primary" v-else @click="updateNowRole(dialogform.Id)" size="medium">确 定</el-button>
        </div>
      </el-dialog>
       <!-- 编辑权限弹出框 -->
        <el-dialog title="编辑权限" :visible.sync="PurviewdialogVisible" :close-on-click-modal="false" :center="false" width="50%">
        <el-form ref="form" :model="dialogform" label-width="80px">
          <el-form-item label="权限">
          <el-tree ref="tree"
            :data="routesData"
            :props="defaultProps"
            :default-checked-keys="dialogform.SelectedArray"
            show-checkbox
            default-expand-all
            node-key="id"
            class="permission-tree"
            highlight-current
            :expand-on-click-node="false"
            @check-change="leftCheckChange">
            <span class="custom-tree-node" slot-scope="{ node, data }" >
              <span>{{ data.label }}</span>
                <span style="margin-left: 50px;">
                     <el-checkbox 
                    v-for="DataList in data.buttonArry" 
                    :key="DataList.id"
                    :label="DataList.id" 
                    v-model="checkVal"
                    @change="onChange">
                    {{DataList.label}}</el-checkbox>
                </span>
            </span>
          </el-tree>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="PurviewdialogVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="updateNowPurview(dialogform.Id)" size="medium">确 定</el-button>
        </div>
      </el-dialog>
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
        Id:"",
        RoleName:"",
        IsDelete:false,
        Remarks:"",
        SelectedArray:[],
        FatherArray:[],
        MenuPowerArry:[]
      },
      dialogFormVisible:false,
      PurviewdialogVisible:false,
      titlename:"",
      drawer:false,
      hint:"",
      isAdd:true,
      checkVal:[]
    }
  },
  created(){
    this.getManagerRolList();
    this.getManager();
  },
  methods:{
    getManagerRolList:function(){//获取角色列表信息
      this.$api.managerrole.getmanagerrolelist(this.pageModel).then(res => {
        if(res.ResultCode == 200)
        {
           this.tableData = res.ResultData.data;
           this.pageModel= res.ResultData.pageModel;
        }
      })
    },
    handleSizeChange(val) {//改变每页数量触发方法
      this.pageModel.pageSize=val,
      this.getManagerRolList();
    },
    handleCurrentChange(val) {//点击上/下一页触发方法
      this.pageModel.curPage=val,
      this.getManagerRolList();
    },
    addDialog(formName){//添加角色弹窗
     this.isAdd=true
      if (this.$refs[formName]!==undefined) {
        this.$refs[formName].resetFields();
      }
      this.dialogFormVisible=true,
      this.titlename="添加角色"
    },
    editData(roleId){//编辑角色获取当前角色信息
      this.dialogFormVisible=true,
      this.isAdd=false,
      this.titlename="编辑角色",
       this.$api.managerrole.selectrolemodel(roleId).then(res=>{
        this.dialogform=res.ResultData.Model
      })
    },
    editPurview(roleId){//编辑权限弹窗
      this.PurviewdialogVisible=true,
      this.dialogform.Id=roleId
       this.$api.managerrole.selectrolemodel(roleId).then(res=>{
        this.$refs.tree.setCheckedKeys(res.ResultData.RoleArray);
        this.checkVal=res.ResultData.PowerArray
      })
    },
    updateNowPurview(roleId){//修改权限信息
      this.dialogform.Id=roleId
      this.dialogform.SelectedArray= this.$refs.tree.getCheckedKeys()//.concat(this.$refs.tree.getHalfCheckedKeys())包含选中数据的第一级数据key
      this.dialogform.MenuPowerArry= this.checkVal
      this.dialogform.FatherArray=this.$refs.tree.getHalfCheckedKeys()
      // this.$message({ message: this.dialogform.SelectedArray, type: "success" })
      // this.$message({ message: this.dialogform.FatherArray, type: "success" })
      // this.$message({ message: this.dialogform.SelectedArray, type: "success" })
      this.$api.managerrole.updatenowpurview(this.dialogform).then(res=>{
         this.$message({ message: res.ResultMsgs, type: res.ResultType })
          if(res.ResultCode == 200){
            this.PurviewdialogVisible=false
            this.getManagerRolList()
          }
      })
    },
    getManager(){//获取所有菜单集合
      this.$api.common.findAllMenu().then(res=>{
        console.log(res.ResultData.data)
        this.routesData=addSelectMenu(res.ResultData.data);
        console.log(this.routesData)
      })
    },
    deleteRole(roleId) {//删除角色信息
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.managerrole.deletenowrole(roleId).then(res=>{
           this.$message({ message: res.ResultMsgs, type: res.ResultType })
            if(res.ResultCode == 200){
             this.dialogFormVisible=false
             this.getManagerRolList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addNewRole(){//添加角色信息
       this.$api.managerrole.addnewrole(this.dialogform).then(res=>{
          this.$message({ message: res.ResultMsgs, type: res.ResultType })
          if(res.ResultCode == 200){
            this.dialogFormVisible=false
            this.getManagerRolList()
          }
      })
    },
    updateNowRole(){//修改角色信息
       this.$api.managerrole.updatenowrole(this.dialogform).then(res=>{
          this.$message({ message: res.ResultMsgs, type: res.ResultType })
          if(res.ResultCode == 200){
            this.dialogFormVisible=false
            this.getManagerRolList()
          }
      })
    },
    disOrEnaManager(roleId,type){//角色停用/启用
       if(type==1){
         this.hint="是否启用当前角色?"
       }
       else{
         this.hint="是否停用当前角色?"
       }
       this.$confirm(this.hint, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.managerrole.enableordisablerole(roleId).then(res=>{
           this.$message({ message: res.ResultMsgs, type: res.ResultType })
            if(res.ResultCode == 200){
             this.dialogFormVisible=false
             this.getManagerRolList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
     leftCheckChange(node, selected, indeterminate) {
       if(node.children!=null){
          node.children.forEach((x, index) => {
            //  x.checked = selected;
            this.$set(x, "checked", selected);
          });
       }
    },
    onChange() {
     // this.$message("xxx");
    },
  }
}

/**
* 级联下拉数据
* @param {*} menuList 菜单列表
*/
function addSelectMenu(menuList){
  debugger
  const result = []
  for(var i=0;i<menuList.length;i++){
    const id= menuList[i].GuId
    const label= menuList[i].FullName
    let children=menuList[i].children

    if(children){
      children=addSelectMenu(children)
    }

    let buttonArry=[]

    if(menuList[i].Buttonchildren !==null)
    {
      buttonArry=addButton(menuList[i].Buttonchildren)
    }

    result.push({
      id,
      label,
      children,
      buttonArry
    })
  }
  return result
}


/**
* 级联下拉数据
* @param {*} ButtonList 菜单按钮列表
*/
function addButton(ButtonList){
  const result = []
  for(var j=0;j<ButtonList.length;j++)
  {
    const id= ButtonList[j].GuId
    const label= ButtonList[j].FullName
    const children=ButtonList[j].children

    result.push({
      id,
      label,
      children
    })
  }
  return result
}


/**
* 级联下拉数据
* @param {*} menuList 菜单列表
*/
function addSelectButton(menuList){
  const result = []
  if(typeof(menuList)!='undefined'){
     for(var i=0;i<menuList.length;i++){
      const id= menuList[i].GuId
      const label= menuList[i].FullName
      let children=menuList[i].children
      if(children){
        children=addSelectButton(children)
      }

      result.push({
        id,
        label,
        children,
      })
    }
  }
  return result
}
</script>

