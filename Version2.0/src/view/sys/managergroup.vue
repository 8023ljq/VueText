<template>
<div>
  <div class="Inquire">
   <el-row>
    <el-col :span="1">   
      <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="addDialog()">添加</el-button>
      <el-upload
    class="upload-demo"
    action=""
    :on-change="handleChange"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
    :limit=1
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    :auto-upload="false">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
</el-upload>
 <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline" @click="testC()">上传</el-button>
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
            <el-tag type="success" v-else disable-transitions>二级分组</el-tag>
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
      <el-table-column label="操作" min-width="130" align="center">
        <template slot-scope="scope">
             <el-button type="primary" size="mini" icon="el-icon-edit" @click="getManagerGroup(scope.row.Id)">编辑</el-button>
             <el-button type="primary" size="mini" icon="el-icon-edit-outline" v-if="scope.row.ParentId==='0'" @click="addSonDialog(scope.row.Id)">添加子级</el-button>
             <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteGroup(scope.row.Id)">删除</el-button>
             <!-- <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleRoute('sys/text/',scope.row.Id)">角色</el-button> -->
             <!-- <router-link :to="'/sys/text/'+scope.row.Id">
               <el-button type="primary" size="small" icon="el-icon-edit">
                 角色
               </el-button>
             </router-link> -->
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
import XLSX from 'xlsx'
export default {
  data(){
    return{
      tableData:[{}],//菜单表格数据
      arr:[],
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
    this.testA();
    this.testB();
  },
  computed: {
    mainTabs: {
      get () { return this.$store.state.tab.mainTabs },
      set (val) { this.$store.commit('updateMainTabs', val) }
    },
    mainTabsActiveName: {
      get () { return this.$store.state.tab.mainTabsActiveName },
      set (val) { this.$store.commit('updateMainTabsActiveName', val) }
    }
  },
  methods:{
    GetManagerGroupList:function(){//获取用户组列表
      this.$api.managergroup.getmanagergrouplist(this.pageModel).then(res => {
        if(res.ResultCode == 200)
        {
           this.tableData = res.ResultData.data;
           this.pageModel= res.ResultData.pageModel;
        }
      })
    },
    getGroupSelectList:function(){//获取用户组下拉列表
      this.$api.managergroup.getgroupselectlist().then(res => {
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
      this.$api.managergroup.getmanagergroup(GroupId).then(res=>{
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
       this.$api.managergroup.addmanagergroup(this.dialogform).then(res => {
       this.$message({ message: res.ResultMsgs, type: res.ResultType })
       this.dialogFormVisible=false
       this.GetManagerGroupList()
      })
    },
    updateManagerModel:function(Id) {//修改用户组
      this.dialogform.Id = Id
        this.$api.managergroup.updatemanagergroup(this.dialogform).then(res => {
        this.$message({ message: res.ResultMsgs, type: res.ResultType })
        if(res.ResultCode==200)
        {
          this.dialogFormVisible=false
          this.GetManagerGroupList()
        }
      })
    },
    deleteGroup:function(Id){//删除用户组
      this.$confirm('此操作将永久删除该用户组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$api.managergroup.deletemanagergroup(Id).then(res=>{
          this.$message({ message: res.ResultMsgs, type: res.ResultType })
          if(res.ResultCode==200)
          {
            this.GetManagerGroupList()
          }
        })
      })
    },
    handleRoute (menu,Id) {
    // 如果是嵌套页面，转换成iframe的path
      let path = getIFramePath(menu)
      if(!path) {
        path = menu
      }
      //通过菜单URL跳转至指定路由
      this.$router.push("/" + path+Id)
    },
    testA(){//测试接口A
     this.$api.common.testA().then(res => {
       console.log(res.ResultData.data);
      })
    },
    testB(){//测试接口B
      this.$api.common.testB().then(res => {
       console.log(res.ResultData.data);
      })
    },
    testC(){//测试接口C
     console.log(this.arr)
     this.$api.common.getarr(this.arr).then(res => {
        console.log(res.ResultData.data);
      })
    },
    handleExceed(){
      this.$message({
        type:'warning',
        message:'超出最大上传文件数量的限制！'
      })
      return;
    },
    //移除文件的操作方法
    handleRemove(file,fileList){
      this.fileTemp = null
    },
    importfxx(obj) {
            let _this = this;
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
 
            this.file = event.currentTarget.files[0];
 
            var rABS = false; //是否将文件读取为二进制字符串
            var f = this.file;
 
            var reader = new FileReader();
            //if (!FileReader.prototype.readAsBinaryString) {
            FileReader.prototype.readAsBinaryString = function(f) {
                var binary = "";
                var rABS = false; //是否将文件读取为二进制字符串
                var pt = this;
                var wb; //读取完成的数据
                var outdata;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    //如果没有在main.js中引入，则此处需要引入，用于解析excel
                    // var XLSX = require("xlsx");
                    if (rABS) {
                        wb = XLSX.read(btoa(fixdata(binary)), {
                        //手动转化
                        type: "base64"
                        });
                    } else {
                        wb = XLSX.read(binary, {
                        type: "binary"
                        });
                    }
                    outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); 
                    //outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
                    //此处可对数据进行处理
                    let arr = [];
                    outdata.map(v => {
                        let obj = {}
                        obj.code = v['Code']
                        obj.name = v['Name']
                        obj.pro = v['province']
                        obj.cit = v['city']
                        obj.dis = v['district']
                        arr.push(obj)
                    });
                    _this.da=arr;
                    _this.dalen=arr.length;
                    _this.arr=arr;
                    console.log(arr)
                    console.log(_this.arr)
                };
                reader.readAsArrayBuffer(f);
            };
            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        },
         handleChange(file, fileList){
      this.fileTemp = file.raw;
            if(this.fileTemp){
                if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') 
                    || (this.fileTemp.type == 'application/vnd.ms-excel')){
                    this.importfxx(this.fileTemp);
                } else {
                    this.$message({
                        type:'warning',
                        message:'附件格式错误，请删除后重新上传！'
                    })
                }
            } else {
                this.$message({
                    type:'warning',
                    message:'请上传附件！'
                })
            }
        },
  }
}
</script>

