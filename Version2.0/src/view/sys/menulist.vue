<template>
  <div>
    <div class="Inquire">
      <el-row :gutter="20">
        <el-col :span="4"><el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input></el-col>
        <el-col :span="4"><el-button size="medium" type="primary" icon="el-icon-search">搜索</el-button></el-col>
      </el-row>
    </div>
  <div>
      <!-- :default-expand-all="true" 是否打开所有下级 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="Sort"
        :stripe="true"
        border
        lazy
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
        <el-table-column prop="IsShow" label="是否显示" style="width: 5%" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.IsShow" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="width: 10%" align="center">
           <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editdata(scope.row.Id,0)">编辑</el-button>
             <el-button type="primary" size="mini" icon="el-icon-edit-outline" v-if="scope.row.ParentId==='0'" @click="editdata(scope.row.Id,1)">添加子级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
      <el-dialog :title="titlename" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :center="false" width="40%">
        <el-form ref="form" :model="dialogform" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="菜单等级" required>
               <treeselect 
               :options="options" 
               :disabled="Isdisabled"
               v-model="dialogform.ParentId"></treeselect>
               <!-- :disabled="Isdisabled"
               v-model="dialogform.ParentId" -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="菜单名称" required>
                 <el-input v-model="dialogform.FullName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="菜单路由" required>
                <el-input v-if="dialogform.AddressUrl" v-model="dialogform.AddressUrl"></el-input>
                <el-input v-else placeholder="一级菜单" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="显示图标" required>
                <el-input v-model="dialogform.IconUrl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否显示" required>
                <el-switch
                  v-model="dialogform.IsShow"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="排列顺序" required>
                <el-input v-model="dialogform.Sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogform.Remarks"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" size="medium">确 定</el-button>
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
      tableData: [{}],//菜单表格数据
      dialogFormVisible: false,//是否显示
      dialogform: {//表单数据
        Id:"",
        ParentId:"",
        FullName: "",
        AddressUrl:"",
        IconUrl:"",
        IsShow:true,
        Sort:0,
        Remarks:"",
      },
      options:[{}],//树形数据
      titlename:"",//弹窗标题
      Isdisabled:false//级联选择器是否启用
    };
  },
  created() {
    this.convert();
  },
  methods: {
    // 获取菜单树形结构数据
    convert: function() {
      this.$api.common.findNavTree().then(res => {
        this.tableData = res.ResultData.data;
        var arry= addSelectMenu(this.tableData)
        this.options=arry;
        const id= "0"
        const label= "父级菜单"
        this.options.push({
          id,
          label
        })
      })
    console.log(this.options)
    },
    // 获取单条菜单数据
    editdata: function(menuId,type) {
      console.log(this.options)
      if(type==0){
       this.titlename="编辑菜单"
       
       this.$api.common.findNavModel(Id).then(res => {
         if (res.ResultCode !== 200) {
            this.$message({ message: res.ResultMsgs, type: 'error' })
          }
          else {
            this.dialogform=res.ResultData.data
          }
       })
       if(menuId!=this.dialogform.Id){
         this.Isdisabled=false
       }
       else 
       {
         this.Isdisabled=true
       }
      }else{
       this.titlename="添加子级"
       this.Isdisabled=false
       for(var key in this.dialogform){
          delete this.dialogform[key]
       }
       this.dialogform.ParentId=menuId
      }
      this.dialogFormVisible=true
    }
    // 弹窗修改
  }
}
/**
* 级联下拉数据
* @param {*} menuList 菜单列表
*/
function addSelectMenu(menuList){
  const result = []
  for(var i=0;i<menuList.length;i++){
    const id= menuList[i].Id
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
