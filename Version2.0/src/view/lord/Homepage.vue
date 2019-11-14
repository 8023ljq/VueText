<template>
  <div class="homepagesty">
    <el-row :gutter="20" class="mainpanel">
       <el-col :xs="12" :sm="12" :lg="6">
        <el-card shadow="always" class="datapanel">
          <div class="imgpanel">
            <img src="@/assets/urgent.png" class="imgsty">
          </div>
          <div class="countpanel">
                <div class="textpanel">
                    Emergency
                    <!-- 紧急代办事件 -->
                </div>
            <countTo :startVal='0' :endVal='4253' :duration='3000' class="card-panel-num"></countTo>
          </div>
        </el-card>
       </el-col>
        <el-col :xs="12" :sm="12" :lg="6">
            <el-card shadow="always" class="datapanel">
             <div class="imgpanel">
               <img src="@/assets/userlist.png" class="imgsty">
             </div>
             <div class="countpanel">
                <div class="textpanel">
                     New Visits
                    <!-- 用户注册总数 -->
                </div>
               <countTo :startVal='0' :endVal='7852' :duration='3000' class="card-panel-num"></countTo>
             </div>
           </el-card>
       </el-col>
        <el-col :xs="12" :sm="12" :lg="6">
           <el-card shadow="always" class="datapanel">
             <div class="imgpanel">
               <img src="@/assets/text.png" class="imgsty">
             </div>
             <div class="countpanel">
                <div class="textpanel">
                    New Order
                    <!-- 新的订单 -->
                </div>
                <countTo :startVal='0' :endVal='6545' :duration='3000' class="card-panel-num"></countTo>
             </div>
           </el-card>
       </el-col>
        <el-col :xs="12" :sm="12" :lg="6">
           <el-card shadow="always" class="datapanel">
             <div class="imgpanel">
               <img src="@/assets/info.png" class="imgsty">
             </div>
             <div class="countpanel">
                <div class="textpanel">
                    Messages
                    <!-- 消息 -->
                </div>
               <countTo :startVal='0' :endVal='7865' :duration='3000' class="card-panel-num"></countTo>
             </div>
           </el-card>
       </el-col>
   </el-row>
   <el-row :gutter="20" class="midpanel">
     <el-col :span="16" :xs="12" :sm="12" :lg="17">
         <div class="grid-content">
            <el-card shadow="always" class="datapanel">
             <el-button type="primary" @click="testExport()">主要按钮</el-button>
             </el-card>  
         </div>
     </el-col>
     <el-col :span="8" :xs="12" :sm="12" :lg="7">
        <div class="grid-content">
            <el-card shadow="always" >
                <div slot="header">
                  <img src="http://localhost:8090/upload/jpg/20190819/2019081917293839847544.jpg" style="width:100%;margin:ouat;height: 270px;">
                </div>
                <div style="margin: 10px 20px">
                    <div class="progress-item">
                        <span class="demonstration">初始进度条</span>
                        <el-progress :percentage="50" color="#40c9c6"></el-progress>
                    </div>
                    <div class="progress-item">
                        <span class="demonstration">蓝条</span>
                        <el-progress :percentage="99"></el-progress>
                    </div>
                </div>
             </el-card>  
        </div>
     </el-col>
   </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data () {
    return {
        value:50,
        PageModel:{
          pageSize:10,
          curPage:1
        }
    }
   },
   methods: {
     testExport:function(){
        this.$axios({
        method:'post',
        url:'/exportData/api/text/exportdata',
        headers:{
          'Content-Type':'application/json',
        },
        responseType:'blob',
        data:this.PageModel
      },).then(res=>{
         const link = document.createElement('a');
         let fileName='xxx';
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'});
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.download =fileName //下载的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(err=>{
        console.log(err);
      })
     }
  }
}
</script>

<style lang="scss">

.mainpanel{
    margin-top: 10px;
}

.datapanel{
    margin: 0px !important;
    padding: 0px !important;
    height:100px !important;
}

.imgpanel{
    float: left;
    height: 100px;
    line-height: 100px;
    width: 30%;
}

.iconsty{
    margin: 0px;
    padding: 0px;
    height: 100px;
    width: 50%;
    line-height: 100px;
}

.el-card__body{
    padding: 0px !important;
}

.imgsty{
    padding: 15px;
    width: 70px;
    float: left;
    line-height: 100px;
}

.card-panel-num{
    font-size: 20px;
}

.countpanel{
    float:right;
    height: 100px;
    width: 70%;
}

.textpanel{
  padding: 20px;
  color: rgba(0,0,0,.45);
  font-weight:bold
}
.midpanel{
    padding-top: 10px;
}
  
.homepagesty{
   padding: 10px;
   background-color: #f0f2f5;
   min-height: calc(100vh - 151px);
   min-width: calc(100vh - 20px);
}

.el-card__header{
    padding: 0px !important;
    border: none !important;
}

.progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .demonstration{
    display: flex;
  }
</style>