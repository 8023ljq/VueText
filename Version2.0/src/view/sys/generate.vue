<template>
  <div class="page-main" style="width:99%;margin-top:15px;">
     <el-row :gutter="20">
        <el-col :span="5">
          <el-card shadow="always">  
            <div class="grid-content bg-purple">
               <el-form :model="ruleForm" :rules="fieldRules" ref="ruleForm" class="demo-ruleForm">
                   <el-form-item prop="Ip">
                      <el-input size="small" v-model="ruleForm.Ip" placeholder="服务器名称"></el-input>
                   </el-form-item>
                   <el-form-item prop="Account">
                      <el-input size="small" v-model="ruleForm.Account"  placeholder="登录名"></el-input>
                   </el-form-item>
                   <el-form-item prop="Pwd">
                      <el-input size="small" v-model="ruleForm.Pwd" placeholder="密码" type="password"></el-input>
                   </el-form-item>
                   <el-form-item>
                      <el-button size="medium" style=" width:100% ;background-color: #409EFF;color:#fff" @click="linkDB('ruleForm')">连 接</el-button>
                   </el-form-item>
                   <el-form-item>
                     <el-tree ref="tree"
                        :data="dataTreeList"
                        :props="defaultProps"
                        show-checkbox
                        :default-expand-all="false"
                        node-key="id"
                        class="permission-tree"
                        highlight-current
                        :expand-on-click-node="false">
                      </el-tree>
                   </el-form-item>
               </el-form>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card shadow="always">   
            <div class="grid-content bg-purple"></div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card shadow="always">   
            <div class="grid-content bg-purple"></div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card shadow="always">   
            <div class="grid-content bg-purple"></div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">   
            <div class="grid-content bg-purple"></div>
          </el-card>
        </el-col>
    </el-row>
 </div>
</template>

<script>
export default {
    data(){
        return {
            ruleForm:{
                Ip:"",
                Account:"",
                Pwd:""
            },
            fieldRules:{
               Ip:[
                 { required: true, message: '请填写服务器名称', trigger: 'blur' },
               ], 
               Account:[
                 { required: true, message: '请填写登录名', trigger: 'blur' },
               ],
               Pwd:[
                 { required: true, message: '请填写登录密码', trigger: 'blur' },
               ],
            },
            dataTreeList:[],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
        }
    },
    created(){},
    methods:{
        linkDB(){
           this.$refs.ruleForm.validate((valid) => {
               if(!valid){
                   return false;
                }
               else{
                 this.$api.builder.connectionAct(this.ruleForm).then(res=>{
                   this.$message({ message: res.ResultMsgs, type: res.ResultType })
                   if(res.ResultCode == 200){
                     this.getDateList();
                   }
                 }) 
               }
           }) 
        },
        getDateList(){
           this.$api.builder.getDateList(this.ruleForm).then(res=>{
              if(res.ResultCode != 200){
                this.$message({ message: res.ResultMsgs, type: res.ResultType })
              }
              else{
                debugger
                console.log(res.ResultData)
                console.log(res.ResultData.data);
                this.dataTreeList=res.ResultData.data;
              }
            }) 
        }
    },
}
</script>

<style>
  .page-main{
    padding: 10px;
    background-color: #f0f2f5;
    min-height: calc(100vh - 151px);
    min-width: calc(100vh - 20px);
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background-color: #FFF;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .demo-ruleForm{
      padding: 10px;
  }

</style>