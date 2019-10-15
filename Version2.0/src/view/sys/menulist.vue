<template>
  <div>
    <div class="Inquire">
      <el-row :gutter="20">
        <!-- <el-col :span="4">
          <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search" ></el-input>
          </el-col> -->
        <el-col :span="1">
          <!-- <el-button size="medium" type="primary" icon="el-icon-search">搜索</el-button> -->
           <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="addDialog('dataform')">新增</el-button>
        </el-col>
      </el-row>
    </div>
  <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="Id"
        :stripe="true"
        border
        lazy
        :default-expand-all="true"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="FullName" label="菜单名称" style="width: 26%"></el-table-column>
        <el-table-column prop="AddressUrl" label="菜单路由" style="width: 26%">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.ParentId=='0'" disable-transitions>一级菜单</el-tag>
            <span v-else>{{ scope.row.AddressUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="AddTime" label="添加时间" style="width: 26%">
          <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.AddTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="IconUrl" label="显示图标" style="width: 5%" align="center"> 
          <template slot-scope="scope">
            <i v-if="scope.row.IconUrl" :class="scope.row.IconUrl"></i>
            <i v-else class="el-icon-s-operation"></i>
          </template>
        </el-table-column>
        <el-table-column prop="Sort" label="排序字段" style="width: 5%" align="center"> 
        </el-table-column>
        <el-table-column prop="IsShow" label="是否显示" style="width: 5%" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.IsShow" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="width: 10%" align="center">
           <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editdata(scope.row.GuId)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deletemenu(scope.row.GuId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加/编辑菜单数据弹出框 -->
      <el-dialog :title="titlename" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :center="false" width="40%">
        <el-form ref="dataform" :model="dialogform" :rules="fieldRules" label-width="80px">
          <el-row :gutter="20">
             <el-col :span="12">
              <el-form-item label="菜单等级" prop="ParentId" required>
                <el-cascader 
                  ref="menucascader"
                  v-model="dialogform.ParentId"
                  :options="options" 
                  :props="{ checkStrictly: true }"
                  :emitPath="false"
                  :disabled="menuGradedisabled"
                  @change="gradechange()">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="菜单名称" prop="FullName" required>
                 <el-input v-model="dialogform.FullName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="菜单路由" prop="AddressUrl" required>
                <el-input v-model="dialogform.AddressUrl" :disabled="addressUrldisabled"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
               <el-form-item label="排列顺序" prop="Sort" required>
                <el-input v-model="dialogform.Sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否显示" prop="IsShow" required>
                <el-switch
                  v-model="dialogform.IsShow"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  class="selector">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="显示图标" prop="IconUrl" required>
                 <el-input v-model="dialogform.IconUrl"></el-input>
                <!-- <div style="float: left;">
                  <el-tag
                    :key="tag"
                    v-for="tag in tagData"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                  <i :class="tag"></i>
                  </el-tag>
                  <el-button  class="addpower" @click="choosetag()" size="small">选择标签</el-button> 
                </div>-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注信息" prop="Remarks">
            <el-input type="textarea" v-model="dialogform.Remarks"></el-input>
          </el-form-item>
          <el-form-item v-if="purviewVisible" label="按钮权限">
            <template>
              <el-table
                :data="PowerListData"
                style="width: 100%"
                row-key="Id"
                :stripe="true"
                border
                lazy
                :default-expand-all="true"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column prop="FullName" label="按钮名称">
                </el-table-column>
                <el-table-column prop="Purview" label="按钮标识">
                </el-table-column>
                <el-table-column label="操作" min-width="50" align="center">
                  <template slot-scope="scope">
                   <el-button type="danger" size="mini" icon="el-icon-delete" @click="deletepower(scope.row.GuId)">删除</el-button>
                  </template> 
                </el-table-column>
              </el-table>
            </template> 
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
          <el-button v-if="purviewVisible" @click="addmenupower()" size="medium">添加按钮</el-button>
          <el-button type="primary" v-if="addButtonVisible"  @click="addNewMenu()" size="medium">确 定</el-button>
          <el-button type="primary" v-else @click="UpdateNewMenu()" size="medium">提 交</el-button>
        </div>
      </el-dialog>
       <!-- 添加按钮弹出框 -->
      <el-dialog title="添加按钮"  :visible.sync="dialogButtonVisible" :close-on-click-modal="false" :center="false" width="20%">
        <el-form ref="databuttonform" :model="databuttonform" :rules="fieldRules" label-width="80px">
           <el-form-item label="按钮名称" prop="PowerName" required>
            <el-input type="text" v-model="databuttonform.PowerName"></el-input>
          </el-form-item>
            <el-form-item label="按钮标识" prop="PowerMark" required>
            <el-input type="text" v-model="databuttonform.PowerMark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogButtonVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="addmenupoweract()" size="medium">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 选择标签弹出框 -->
      <el-dialog title="选择标签"  :visible.sync="dialogTagVisible" :close-on-click-modal="false" :center="false" width="20%">

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

.input {
  width: 10%;
  float: left;
  margin: 0px 10px;
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

.selector{
  float: left;
  height: 40px;
  line-height: 40px;
}
.addpower{
  border:1px dashed #DCDFE6 !important;
}

.has-gutter{
  line-height: 0px !important;
}
</style>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { 
    Treeselect 
  },
  data() {
    return {
      PowerListData: [{}],
      tableData: [{}],//菜单表格数据
      dialogform: {//表单数据
        Id:"",
        GuId:"",
        ParentId:"",
        FullName: "",
        AddressUrl:"",
        IconUrl:"",
        IsShow:true,
        Sort:0,
        Remarks:"",
      },
      databuttonform:{
        MenuId:"",
        PowerName:"",
        PowerMark:""
      },
      options:[{}],//树形数据
      titlename:"",//弹窗标题
      Isdisabled:false,//级联选择器是否启用
      addressUrldisabled:false,//路由地址是否禁用
      menuGradedisabled:false,//菜单等级是否禁用
      dialogFormVisible: false,//是否显示
      dialogButtonVisible:false,//按钮权限弹窗时候显示
      purviewVisible:false,//权限模快是否显示
      addButtonVisible:true,
      tagData:['el-icon-s-operation'],//标签显示数据
      dialogTagVisible:false,//选择标签弹窗是否显示
      fieldRules:{//表单数据验证
        GuId:[
          { required: true, message: '请选择菜单等级', trigger: 'blur' },
        ],
        FullName:[]
      },
    };
  },
  created() {
    this.convert();
  },
  methods: {
    convert: function() { // 获取菜单树形结构数据(进入页面默认加载列表)
      this.$api.common.findAllMenu().then(res => {
        this.tableData = res.ResultData.data;
      })
    },
    editdata: function(menuId) {// 获取单条菜单数据
      this.options=addSelectMenu(this.tableData,false)
      this.addButtonVisible=false
      this.titlename="编辑菜单"
      this.$api.common.findNavModel(menuId).then(res => {
        if (res.ResultCode !== 200) {
          this.$message({ message: res.ResultMsgs, type: 'error' })
        }
        else {
          this.dialogform=res.ResultData.data.MenuModel
          this.PowerListData=res.ResultData.data.MenuPowerList
          const tagArry = []
          console.log(res.ResultData.data.MenuModel.IconUrl)
          this.tagData=[]
          this.tagData.push(res.ResultData.data.MenuModel.IconUrl)
          if(this.dialogform.ParentId!='0'){
            this.dialogform.IconUrl='el-icon-s-operation'
            this.addressUrldisabled=false
            this.menuGradedisabled=false
            this.purviewVisible=true
          }
          else{
            const value= "0"
            const label= "父级菜单"
            this.options.unshift({
              value,
              label,
            })
            this.dialogform.AddressUrl="一级菜单"
            this.addressUrldisabled=true
            this.menuGradedisabled=true
            this.purviewVisible=false
          }
        }
      })
      if(menuId!=this.dialogform.GuId){
        this.Isdisabled=false
      }
      else 
      {
        this.Isdisabled=true
      }
      this.dialogFormVisible=true
    },
    addDialog(formName){// 添加弹窗
      this.purviewVisible=false
      this.addButtonVisible=true
      this.menuGradedisabled=false
      if (this.$refs[formName]!==undefined) {
        this.$refs.dataform.resetFields();
      }
      this.options=addSelectMenu(this.tableData,true)
      const value= "0"
      const label= "父级菜单"
      this.options.unshift({
        value,
        label,
      })
      this.titlename="添加菜单"
      this.dialogFormVisible=true
    },
    addNewMenu(){// 添加菜单操作
     this.$refs.dataform.validate((valid) => {
          if (valid) {
            let ParentId=this.$refs.menucascader.getCheckedNodes()[0].value
            this.dialogform.ParentId=ParentId
            this.$api.common.addNewMenu(this.dialogform).then(res=>{
              this.$message({ message: res.ResultMsgs, type: res.ResultType })
            })
          } else {
             return false;
          }
        });
    },
    UpdateNewMenu(){// 修改菜单信息
      this.$api.common.updateMenu(this.dialogform).then(res=>{
        this.$message({ message: res.ResultMsgs, type: res.ResultType })
         if(res.ResultCode==200)
          {
             this.dialogFormVisible=false
             this.convert()
          }
      })
    },
    deletemenu(menuId){// 删除菜单
       this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
       }).then(()=>{
        this.$api.common.deleteMenu(menuId).then(res =>{
          this.$message({ message: res.ResultMsgs, type: res.ResultType })
          if(res.ResultCode==200)
          {
            this.convert()
          }
        })
      })
    },
    gradechange(){// 菜单等级的change事件
      let data=this.$refs.menucascader.getCheckedNodes()[0].value
      if(data=='0'){
        this.addressUrldisabled=true
        this.purviewVisible=false
        this.dialogform.AddressUrl="一级菜单"
      }
      else{
        this.addressUrldisabled=false
        this.purviewVisible=true
        this.dialogform.AddressUrl=""
      }
    },
    addmenupower(){// 添加其他按钮权限弹窗
      this.dialogButtonVisible=true
    },
    addmenupoweract(){// 添加其他按钮权限操作
      this.databuttonform.MenuId=this.dialogform.GuId
      debugger
      this.$api.common.addMenuPowerAct(this.databuttonform).then(res => {
        this.$message({ message: res.ResultMsgs, type: res.ResultType })
        if(res.ResultCode==200){
          this.dialogButtonVisible=false
          this.editdata(this.databuttonform.MenuId)
        }
      })
    },
    deletepower(menuId){// 删除按钮权限
      this.$confirm('此操作将永久删除该按钮, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
       }).then(()=>{
        this.$api.common.deletePower(menuId).then(res =>{
          this.$message({ message: res.ResultMsgs, type: res.ResultType })
          if(res.ResultCode==200)
          {
             this.editdata(this.dialogform.GuId)
          }
        })
      })
    },
    handleClose(tag) {// 标签删除方法
      this.tagData=""
    },
    choosetag(){// 选择标签弹窗
      this.dialogTagVisible=true
    }
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
    const value= menuList[i].GuId
    const label= menuList[i].FullName
    let children= menuList[i].children
    let disabled= false
    result.push({
      value,
      label,
      disabled
    })
  }

  return result
}

/**
* 级联下拉数据
* @param {*} menuList 菜单列表
*/
function updateSelectMenu(menuList){
  const result = []
  for(var i=0;i<menuList.length;i++){
    const value= menuList[i].GuId
    const label= menuList[i].FullName
    let children= menuList[i].children
    let disabled= false
    if(children){
      children=addSelectMenu(children)
    }
    result.push({
      value,
      label,
      children,
      disabled
    })
  }
  return result
}
</script>
