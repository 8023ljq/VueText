<template>
<div>
  <div class="Inquire">
   <el-row>
    <el-col :span="1">   
      <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="addDialog()">添加</el-button>
    </el-col>
   </el-row>
  </div>
  <div>
    <el-table 
    :data="tableData" 
    style="width: 100%"
    row-key="Id"
    border
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
     <el-table-column prop="GroupName" label="组名" ></el-table-column>
     <el-table-column prop="AddressUrl" label="用户组等级" style="width: 26%">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.ParentId=='0'" disable-transitions>一级分组</el-tag>
            <el-tag type="primary" v-else disable-transitions>二级分组</el-tag>
          </template>
        </el-table-column>
     <el-table-column prop="AddName" label="添加人" align="center"></el-table-column>
     <el-table-column prop="AddTime" label="添加时间" min-width="90" align="center">
        <template slot-scope="scope">
         <i class="el-icon-time"></i>
         <span style="margin-left: 10px">{{ scope.row.AddTime }}</span>
       </template>
     </el-table-column>
     <el-table-column prop="Remarks" label="备注" min-width="90" align="center"></el-table-column>
      <el-table-column label="操作" min-width="160" align="center">
        <template slot-scope="scope">
             <el-button type="primary" size="mini" icon="el-icon-edit" @click="getManagerGroup(scope.row.Id)">编辑</el-button>
             <el-button type="primary" size="mini" icon="el-icon-edit-outline" v-if="scope.row.ParentId==='0'" @click="addSonDialog(scope.row.Id)">添加子级</el-button>
             <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
             <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleRoute('sys/text')">角色</el-button>
        </template>
     </el-table-column>
    </el-table>
  </div>
  <!-- 编辑弹出框 -->
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :center="false"> 
    <el-form class="dialog-form" ref="form" :model="dialogform" label-width="80px">
      <el-row :gutter="20">
         <el-col :span="11">
            <el-form-item label="用户组名" required>
                 <el-input v-model="dialogform.GroupName"></el-input>
            </el-form-item>
          </el-col>
         <el-col :span="11" v-if="selectdisabled">
            <el-form-item label="所属组别" required>
              <el-select v-model="dialogform.ParentId"  placeholder="请选择">
                <el-option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="备 注" required>
                <el-input type="textarea" :rows="5" v-model="dialogform.Remarks"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
     </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" v-if="addorupdate" @click="addManagerGroup(Type)" size="medium">确 定</el-button>
        <el-button type="primary" v-else @click="updateManagerModel(dialogform.Id)" size="medium">提 交</el-button>
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
  float:left;
}

.el-dialog__title {
  float: left;
}
</style>

<script>
import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
export default {
  data(){
    return{
      tableData:[{}],//菜单表格数据
      pageModel:{
        pageSize: 10,
        curPage: 1,
        Keyword:"",
      },
      dialogform:{//表单数据
         Id:"",
         GroupName:"",
         ParentId:"",
         Remarks:"",
         AddType:0
      },
      options:[{}],//树形数据
      value:"",//下拉框默认值
      dialogFormVisible: false,//是否显示
      dialogTitle:"",
      addorupdate:true,
      selectdisabled:true,
      Type:0
    }
  },
  created(){
    this.GetManagerGroupList();//获取用户组列表
    this.getGroupSelectList();//获取用户组下拉列表
  },
  methods:{
    GetManagerGroupList:function(){//获取用户组列表
      this.$api.manager.getmanagergrouplist(this.pageModel).then(res => {
        if(res.ResultCode == 200)
        {
           this.tableData = res.ResultData.data;
           this.pageModel= res.ResultData.pageModel;
        }
      })
    },
    getGroupSelectList:function(){//获取用户组下拉列表
      this.$api.manager.getgroupselectlist().then(res => {
        if(res.ResultCode == 200&&res.ResultData.data!=null)
        {
           this.options = res.ResultData.data;
        }
      })
    },
    handleSizeChange(val) {//改变每页数量触发方法
      this.pageModel.pageSize=val,
      this.GetManagerGroupList();
    },
    handleCurrentChange(val) {//点击上/下一页触发方法
      this.pageModel.curPage=val,
      this.GetManagerGroupList();
    },
    addDialog:function(){//添加用户组弹窗
      this.dialogFormVisible=true
      this.dialogTitle="添加用户组"
      this.dialogform={}
      this.addorupdate=true
      this.selectdisabled=false
      this.Type=1
    },
    addSonDialog:function(ParentId){//添加子级
      this.dialogFormVisible=true
      this.dialogTitle="添加用户组"
      this.dialogform.ParentId=ParentId
      this.addorupdate=true
      this.selectdisabled=false
      this.Type=2
    },
    getManagerGroup:function(GroupId){//修改用户组信息(获取组信息)
      this.dialogFormVisible=true
      this.dialogTitle="编辑用户组"
      this.addorupdate=false
      this.selectdisabled=true
      this.$api.manager.getmanagergroup(GroupId).then(res=>{
        debugger
        if(res.ResultCode == 200)
        {
           this.dialogform = res.ResultData.data;
           if(res.ResultData.data.ParentId=='0'){
             this.selectdisabled=false
           }
           else{
             this.value=res.ResultData.data.ParentId;
           }
        }
        else{
          this.$message({ message: res.ResultMsgs, type: res.ResultType })
        }
      })
    },
    addManagerGroup:function(Type){//添加用户组操作
       this.dialogform.AddType = Type
       this.$api.manager.addmanagergroup(this.dialogform).then(res => {
       this.$message({ message: res.ResultMsgs, type: res.ResultType })
       this.dialogFormVisible=false
       this.GetManagerGroupList()
      })
    },
    updateManagerModel:function(Id) {//修改用户组
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
          this.dialogform.Id = Id
          this.$api.manager.updatemanagergroup(this.dialogform).then(res => {
          this.$message({ message: res.ResultMsgs, type: res.ResultType })
          this.dialogFormVisible=false
          this.GetManagerGroupList()
        })
      })
    },
    handleRoute (menu) {
    debugger
    // 如果是嵌套页面，转换成iframe的path
      let path = getIFramePath(menu)
      if(!path) {
        path = menu
      }
      // 通过菜单URL跳转至指定路由
      this.$router.push("/" + path)
    },
  }
}
</script>

