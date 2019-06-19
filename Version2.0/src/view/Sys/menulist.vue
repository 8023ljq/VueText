<template>
  <div>
    <div class="Inquire">
      <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search" class="input"></el-input>
      <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search" class="input"></el-input>
      <div class="input">
        <el-button class="input-button" size="medium" type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div>
      <!-- :default-expand-all="true" 是否打开所有下级 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="OnlOne"
        :stripe="true"
        border
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="FullName" label="菜单名" style="width: 26%"></el-table-column>
        <el-table-column prop="AddressUrl" label="菜单路由" style="width: 26%">
          <template slot-scope="scope">
            <span v-if="scope.row.AddressUrl">{{ scope.row.AddressUrl }}</span>
            <el-tag type="primary" v-else disable-transitions>一级菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="AddTime" label="添加时间" style="width: 26%">
          <!-- <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.AddTime }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="IconUrl" label="图标" style="width: 5%">
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
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="dialogFormVisible = true">编辑</el-button>
             <el-button type="primary" size="mini" icon="el-icon-edit-outline" v-if="scope.row.ParentId===0" @click="dialogFormVisible = true">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :center="false">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="菜单名称" required>
                 <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="菜单等级" required>
               <el-cascader :options="options" :show-all-levels="false"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.desc"></el-input>
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
</style>


<script>
export default {
  data() {
    return {
      tableData: [{}],
      value1: true,
      value2: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      options:[{}],
    };
  },
  created() {
    this.convert();
   
  },
  methods: {
    convert: function() {
      debugger
      this.$api.common.findNavTree().then(res => {
        this.tableData = res.ResultData.data;
        var arry= addSelectMenu(this.tableData)
        this.options=arry;
      })
    }
  }
}
/**
* 级联下拉数据
* @param {*} menuList 菜单列表
* @param {*} currentmenulist 当前数组对象,只存在一个
* @param {*} newmenulist 整合之后的数据
*/
function addSelectMenu(menuList = [],currentmenulist=[],newmenulist=[]){
  debugger
  for(var i=0;i<menuList.length;i++){
    var menu = {
         value: menuList[i].Id,
         label: menuList[i].FullName,
       }
    if(currentmenulist.length>=1){
      currentmenulist[0].children.push(menu)
    }
    else{
      currentmenulist.push(menu)
    }
    newmenulist.push(currentmenulist)
    if(menuList[i].children && menuList[i].children.length >= 1){
      addSelectMenu(menuList[i].children,currentmenulist,newmenulist)  
    }
  }
}
</script>
