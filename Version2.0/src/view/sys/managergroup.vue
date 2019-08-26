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
      <el-table-column label="操作" align="center">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="editdata(scope.row.Id,0)">编辑</el-button>
     </el-table-column>
    </el-table>
  </div>
  <!-- 编辑弹出框 -->
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :center="false"> 
    <el-form class="dialog-form" ref="form" :model="dialogform" label-width="80px">
        <el-row :gutter="20">
         <el-col :span="11">
            <el-form-item label="组名称" required>
                 <el-input v-model="dialogform.Name"></el-input>
            </el-form-item>
          </el-col>
         <!-- <el-col :span="11">
            <el-form-item label="所属角色" required>
              <el-select v-model="dialogform.RoleId" placeholder="请选择">
                <el-option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
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
        <el-button type="primary" v-if="addorupdate" @click="addManagerModel()" size="medium">确 定</el-button>
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
export default {
  data(){
    return{
      tableData:[{}],//菜单表格数据
      pageModel:{
        pageSize: 10,
        curPage: 1,
        Keyword:""
      },
      dialogform:{//表单数据
         Id:"",
      },
      options:[{}],//树形数据
      value:"",//下拉框默认值
      dialogFormVisible: false,//是否显示
      dialogTitle:"",
      addorupdate:true
    }
  },
  created(){
    this.GetManagerList();
    this.getRoleSelectList();//获取角色列表
  },
  methods:{
    GetManagerList:function(){
      this.$api.manager.getmanagergrouplist(this.pageModel).then(res => {
        if(res.ResultCode == 200)
        {
           this.tableData = res.ResultData.data;
           this.pageModel= res.ResultData.pageModel;
        }
      })
    },
    getRoleSelectList:function(){
       this.$api.manager.getroleselectlist().then(res => {
        if(res.ResultCode == 200&&res.ResultData.data!=null)
        {
           this.options = res.ResultData.data;
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
    },
    addDialog:function(){//添加用户组弹窗
      this.dialogFormVisible=true
      this.dialogTitle="添加用户组"
      this.dialogform={}
      this.addorupdate=true
    },
  }
}
</script>

