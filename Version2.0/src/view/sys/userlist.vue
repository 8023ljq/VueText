<template>
<div id="content">
  <div class="Inquire">
   <el-row :gutter="20">
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
    style="width: 1700;height: 80%"
    :border="true"
    fit>
     <!-- <el-table-column type="expand" fixed>
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="登录次数">
            <span>{{ props.row.LoginTimes }}</span>
          </el-form-item>
          <el-form-item label="最后登录时间">
            <span>{{ props.row.LastLoginTime }}</span>
          </el-form-item>
          <el-form-item label="最后一次登录IP">
            <span>{{ props.row.LastLoginIP }}</span>
          </el-form-item>
          <el-form-item label="备注">
            <span>{{ props.row.Remarks }}</span>
          </el-form-item>
        </el-form>
      </template>
     </el-table-column> -->
     <el-table-column type="index" fixed prop="" label="序列" width="60" align="center"></el-table-column>
     <el-table-column prop="Name" fixed label="账号名称" align="center"></el-table-column>
     <el-table-column prop="RoleName" label="所属角色" align="center"></el-table-column>
     <el-table-column prop="Nickname" label="用户昵称" align="center"></el-table-column>
     <el-table-column prop="Phone" label="联系电话" align="center"></el-table-column>
     <el-table-column prop="Email" label="邮箱地址" align="center"></el-table-column>
     <!-- <el-table-column prop="LoginTimes" label="登录次数" min-width="50" align="center"></el-table-column> -->
     <el-table-column prop="AddTime" label="添加时间" min-width="110" align="center">
       <template slot-scope="scope">
         <i class="el-icon-time"></i>
         <span style="margin-left: 10px">{{ scope.row.AddTime }}</span>
       </template>
     </el-table-column>
     <!-- <el-table-column prop="LastLoginTime" label="最后登录时间" min-width="110" align="center">
       <template slot-scope="scope"> 
         <span style="margin-left: 10px">{{ scope.row.LastLoginTime }}</span>
       </template>
     </el-table-column>
     <el-table-column prop="LastLoginIP" label="最后一次登录IP" min-width="80" align="center"> 
     </el-table-column>
     <el-table-column prop="Remarks" label="备注" align="center"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="300" align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="getManagerModel(scope.row.Id)">编辑</el-button>
        <el-button type="success" size="mini" v-if="scope.row.IsLocking" icon="el-icon-circle-check" @click="disOrEnaManager(scope.row.Id)">启用</el-button>
        <el-button type="danger" size="mini" v-else icon="el-icon-circle-close" @click="disOrEnaManager(scope.row.Id)">停用</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteManager(scope.row.Id)">删除</el-button>
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
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :center="false"> 
    <el-form class="dialog-form" ref="form" :model="dialogform" label-width="80px">
        <el-row :gutter="20">
         <el-col :span="11">
            <el-form-item label="账号名称" required>
              <el-input v-model="dialogform.Name"></el-input>
            </el-form-item>
          </el-col>
         <el-col :span="11">
            <el-form-item label="所属角色" required>
              <el-select v-model="dialogform.RelationId" :disabled="disabled" placeholder="请选择">
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
         <el-col :span="11">
            <el-form-item label="用户昵称" required>
                 <el-input v-model="dialogform.Nickname"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="11">
            <el-form-item label="联系电话" required>
               <el-input v-model="dialogform.Phone"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="4">
            <el-form-item label="用户头像" required>
             <el-upload
               class="avatar-uploader"
               :action="UploadFileUrl"
               :show-file-list="false"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload">
               <img v-if="dialogform.Avatar" :src="this.ImgUrl+dialogform.Avatar" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             </el-upload>
            </el-form-item>
          </el-col>
      </el-row>
       <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="邮箱地址" required>
               <el-input v-model="dialogform.Email"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="备 注" >
                <el-input type="textarea" :rows="5" v-model="dialogform.Remarks"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
     </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" v-if="addorupdate" @click="addManagerModel()" size="medium">提 交</el-button>
        <el-button type="primary" v-else @click="updateManagerModel(dialogform.Id)" size="medium">确 定</el-button>
      </div>
  </el-dialog>
</div>
</template>

<style>
/* #content{
  margin: 10px 20px;
} */
.Inquire {
  width: 100%;
  height: 65px;
  line-height: 65px;
  background-color: #2968a30c;
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
  .el-tooltip{
    float: left;
    line-height: 40px;
    height: 40px;
  }
</style>

<script>
import { UploadFileUrl } from '@/utils/global'
import { ImgUrl } from '@/utils/global'

export default {
  data(){
    return{
      tableData:[{}],//菜单表格数据
      pageModel:{
        pageSize: 10,
        curPage: 1,
        Keyword:'',
      },
      dialogFormVisible: false,//是否显示
      dialogform: {//表单数据
        Id:"",
        RelationId:"",
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
      UploadFileUrl:UploadFileUrl,
      ImgUrl:ImgUrl,
      dialogTitle:"",
      addorupdate:true,
      disabled:false,
    }
  },
  created(){
    this.getManagerList();
    this.getRoleSelectList();
  },
  methods:{
    getManagerList:function(){//获取管理员列表
      this.$api.manager.getmanagerList(this.pageModel).then(res => {
        if(res.ResultCode == 200)
        {
           this.tableData = res.ResultData.data;
           this.pageModel= res.ResultData.pageModel;
        }
      })
    },
    getRoleSelectList:function(){//获取角色列表
       this.$api.manager.getroleselectlist().then(res => {
        if(res.ResultCode == 200&&res.ResultData.data!=null)
        {
           this.options = res.ResultData.data;
        }
      })
    },
    getManagerModel:function(mangaerId){//获取当前管理员信息
      this.dialogTitle="编辑管理员"
      this.dialogFormVisible=true
      this.addorupdate=false
      this.$api.manager.getmanagermodel(mangaerId).then(res=>{
        if(res.ResultCode == 200&&res.ResultData.data!=null)
        {
           this.dialogform = res.ResultData.data;
           this.value=this.dialogform.RelationId;
           debugger
           if(res.ResultData.data.IsDefault)
           {
             this.disabled=true
           }else{
             this.disabled=false
           }
        }
      })
    },
    updateManagerModel:function(){//修改用户实体
      this.$api.manager.updatemanagermodel(this.dialogform).then(res=>{
        if(res.ResultCode == 200)
        {
          this.$message({ message: res.ResultMsgs, type: 'success' })
          this.dialogFormVisible=false;
          this.getManagerList();//获取管理员列表
        }
        else{
          this.$message({ message: res.ResultMsgs, type: 'error' })
        }
      })
    },
    addDialog:function(){//添加管理员弹窗
      this.dialogFormVisible=true
      this.dialogTitle="添加管理员"
      this.dialogform={}
      this.addorupdate=true
      this.disabled=false
    },
    addManagerModel:function(){//添加管理员方法
      this.$api.manager.addmanagermodel(this.dialogform).then(res=>{
        if(res.ResultCode == 200)
        {
          this.$message({ message: res.ResultMsgs, type: 'success' })
          this.dialogFormVisible=false;
          this.getManagerList();//获取管理员列表
        }
        else{
          this.$message({ message: res.ResultMsgs, type: 'error' })
        }
      })
    },
    disOrEnaManager:function(mangaerId){//停用或者启用管理员
      this.$api.manager.disorenamanager(mangaerId).then(res=>{
        if(res.ResultCode == 200)
        {
          this.$message({ message: res.ResultMsgs, type: 'success' })
          this.dialogFormVisible=false;
          this.getManagerList();//获取管理员列表
        }
        else{
          this.$message({ message: res.ResultMsgs, type: 'error' })
        }
      })
    },
    deleteManager:function(mangaerId){//删除管理员
      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$api.manager.deletemanager(mangaerId).then(res=>{
          this.$message({ message: res.ResultMsgs, type: res.ResultType })
          if(res.ResultCode==200)
          {
            this.getManagerList()
          }
        })
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
      if(res.ResultCode == 1&&res.ResultData!=null)
      {
        this.dialogform.Avatar = res.ResultData;
        this.$message.success(res.ResultData);
      }
      else
      {
        this.$message.error(res.ResultData);
      }
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

