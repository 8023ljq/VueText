<template>

<div>
  <div class="Inquire">
   <el-input
    size="medium"
    placeholder="请输入内容"
    prefix-icon="el-icon-search"
    class="input"
    >
  </el-input>
  <el-input
    size="medium"
    placeholder="请输入内容"
    prefix-icon="el-icon-search"
    class="input"
    >
  </el-input>
  <div class="input">
   <el-button class="input-button" size="medium" type="primary" icon="el-icon-search">搜索</el-button>
  </div>
  </div>
  <div>
  <el-table
    :data="tableData"
    style="width: 100%"
    row-key="OnlOne"
    :stripe=true
    border
    lazy
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="FullName"
      label="菜单名"
      style="width: 20%">
    </el-table-column>
    <el-table-column
      prop="IconUrl"
      label="图标"
      style="width: 20%">
    </el-table-column>
    <el-table-column
      prop="AddressUrl"
      label="菜单路由"
      style="width: 20%">
    </el-table-column>  
     <el-table-column
      prop="IsShow"
      label="是否显示"
      style="width: 20%">
      <template slot-scope="scope">
        <el-switch
         v-model="scope.row.IsShow"
         disabled>
      </el-switch>
    </template>
    </el-table-column>  
     <el-table-column
      prop="AddTime"
      label="添加时间"
      style="width: 20%">
     <!-- <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.AddTime }}</span>
      </template> -->
    </el-table-column>
  </el-table>
  </div>
</div>
</template>

<style>
.Inquire{
  width: 100%;
  height: 65px;
  line-height: 65px;
  /* background-color: red; */
}
.input{
  width: 10%;
  float: left;
  margin: 0px 10px;
}

</style>


<script>
   export default {
    data() {
      return {
        tableData: [{
          
        }],
        value1: true,
        value2: false
      }
    },
    created(){
      this.convert();
    },
     methods: {
      convert: function () {
        this.$api.common.findNavTree().then((res) => {
          this.tableData = res.ResultData.data
        })
      }
    }
  }
</script>
