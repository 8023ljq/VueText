<template>
  <div class="page-main" style="width:99%;margin-top:15px;">
     <el-row :gutter="20">
        <el-col :span="5">
          <el-card shadow="always">  
            <div class="grid-content bg-purple">
               <el-form :model="ruleForm" :rules="fieldRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                   <el-form-item label="服务器地址" prop="Ip">
                      <el-input size="small" v-model="ruleForm.Ip"></el-input>
                   </el-form-item>
                   <el-form-item label="服务器密码" prop="Pwd">
                      <el-input size="small" v-model="ruleForm.Pwd"></el-input>
                   </el-form-item>
                   <el-button size="medium" style=" width:100% ;background-color: #409EFF;color:#fff" @click="linkDB('ruleForm')">连 接</el-button>
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
                Pwd:""
            },
            fieldRules:{
               Ip:[
                 { required: true, message: '请填写服务器地址', trigger: 'blur' },
               ], 
               Pwd:[
                 { required: true, message: '请填写服务器密码', trigger: 'blur' },
               ],
            }
        }
    },
    created(){},
    methods:{
        linkDB(){
           this.$refs.ruleForm.validate((valid) => {
               if(!valid){
                   return false;
                }
               else{}
           }) 
        },
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