<template>
<div id="content">
  <div class="Inquire">
   <el-row>
    <el-col :span="4">   
      <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
    </el-col>
    <el-col :span="4">   
      <el-button size="medium" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
    </el-col>
   </el-row>
  </div>
  <div>
    <el-table 
    :data="tableData" 
    style="width: 100%"
    border>
     <el-table-column type="index" prop="" label="序列" width="60" align="center"></el-table-column>
     <el-table-column prop="Name" label="账号名称" align="center"></el-table-column>
     <el-table-column prop="RoleName" label="所属角色" align="center"></el-table-column>
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
      <template slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="getManagerModel(scope.row.Id)">编辑</el-button>
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
      :total="pageModel.count">
    </el-pagination>
     <!-- :page-sizes="[100, 200, 300, 400]" -->
  </div>
  <!-- 编辑弹出框 -->
  <el-dialog title="修改管理员信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :center="false"> 
    <el-form class="dialog-form" ref="form" :model="dialogform" label-width="80px">
      <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="所属角色" required>
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="11">
            <el-form-item label="是否锁定" required>
              <el-tooltip :content="'锁定状态: ' + dialogform.IsLocking" placement="top">
               <el-switch
                 v-model="dialogform.IsLocking"
                 active-color="#ff4949"
                 inactive-color="#13ce66"
                 active-value="true"
                 inactive-value="false">
               </el-switch>
              </el-tooltip>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="20">
         <el-col :span="11">
            <el-form-item label="账号名称" required>
                 <el-input v-model="dialogform.Name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="用户昵称" required>
                 <el-input v-model="dialogform.Nickname"></el-input>
            </el-form-item>
          </el-col>
           
      </el-row>
       <el-row :gutter="20">
         <el-col :span="11">
            <el-form-item label="联系电话" required>
               <el-input v-model="dialogform.Phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="邮箱地址" required>
               <el-input v-model="dialogform.Email"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="用户头像" required>
<el-upload
  class="avatar-uploader"
  :action="UploadFileUrl"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
            </el-form-item>
          </el-col>
      </el-row>
       <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="备 注" required>
                <el-input type="textarea" v-model="dialogform.Remarks"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
     </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" size="medium">提 交</el-button>
      </div>
  </el-dialog>
  <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<style>
#content{
  margin: 10px 20px;
}
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
.dialog-form{
  margin-top: 10px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 110px;
    line-height: 110px;
    text-align: center;
  }
  .avatar {
    width: 110px;
    height: 110px;
    display: block;
  }
</style>

<script>
import { UploadFileUrl } from '@/utils/global'

export default {
  data(){
    return{
      tableData:[{}],//菜单表格数据
      pageModel:{
        pageSize: 10,
        curPage: 1,
      },
      dialogFormVisible: false,//是否显示
      dialogform: {//表单数据
        Id:"",
        RoleId:"",
        Name: "",
        Avatar:"",
        Nickname:"",
        Phone:"",
        Email:"",
        Remarks:"",
        IsLocking:false,
      },
      options:[{}],//树形数据
      value:"",//下拉框默认值
      imageUrl:"",
      UploadFileUrl:UploadFileUrl,
    }
  },
  created(){
    this.getManagerList();//获取管理员列表
    this.getRoleSelectList();//获取角色列表
  },
  methods:{
    getManagerList:function(){
      this.$api.manager.getmanagerList(this.pageModel).then(res => {
        if(res.ResultCode == 200)
        {
           this.tableData = res.ResultData.data;
           this.pageModel= res.ResultData.pageModel;
        }
      })
    },
    getRoleSelectList:function(){
       this.$api.common.getRoleSelectList().then(res => {
        if(res.ResultCode == 200&&res.ResultData.data!=null)
        {
           this.options = res.ResultData.data;
        }
      })
    },
    getManagerModel:function(mangaerId){
      debugger
      this.dialogFormVisible=true
      this.$api.manager.getmanagermodel(mangaerId).then(res=>{
        if(res.ResultCode == 200&&res.ResultData.data!=null)
        {
           this.dialogform = res.ResultData.data;
           this.value=this.dialogform.RoleId;
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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>

