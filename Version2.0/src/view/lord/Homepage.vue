<template>
  <div class="homepagesty">
   <el-row :gutter="20" class="mainpanel">
       <el-col :xs="12" :sm="12" :lg="6">
        <el-card shadow="always" class="datapanel">
          <div class="imgpanel">
            <img src="@/assets/png/urgent.png" class="imgsty">
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
               <img src="@/assets/png/userlist.png" class="imgsty">
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
               <img src="@/assets/png/text.png" class="imgsty">
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
               <img src="@/assets/png/info.png" class="imgsty">
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
     <el-col :span="10" >
         <div class="grid-content" id="container" ref='container' style="max-height:375px">
          <el-card shadow="always" >
            <div id="NestedPies" ref="myEchart"></div>
          </el-card>  
         </div>
     </el-col>
       <el-col :span="10" >
         <div class="grid-content" id="container" ref='container' style="max-height:375px">
            <el-card shadow="always" >
              <el-button type="primary" @click="testExport()">主要按钮</el-button>
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
            </el-card>  
         </div>
     </el-col>
      <el-col :span="4" >
        <div class="grid-content">
             <el-card shadow="always" >
            
            </el-card> 
        </div>
     </el-col>
   </el-row>
   <el-row :gutter="20" class="midpanel">
      <el-col :span="4" >
        <div class="grid-content">
            <el-card shadow="always" >
                <div slot="header">
                  <img src="@/assets/jpg/backdrop.jpg" style="width:100%;margin:ouat;height: 270px;">
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
     <el-col :span="16" :xs="12" :sm="12" :lg="17">
         <div class="grid-content" id="container" ref='container' style="max-height:375px">
            <el-card shadow="always" >
             
            </el-card>  
         </div>
     </el-col>
     <el-col :span="8" :xs="12" :sm="12" :lg="7">
        <div class="grid-content" id="container" ref='container' style="max-height:275px">
            <el-card shadow="always" >
                 <baidu-map :style="{width:map.width,height:map.height}" class="map" ak="bwdwfM9pFbVUoKv03xojn9lEuG3BZPGL" :zoom="map.zoom" 
                    :center="{lng: map.center.lng, lat: map.center.lat}"
                    @ready="handler" :scroll-wheel-zoom="true">
                     <bm-marker :position="{lng: map.center.lng, lat: map.center.lat}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
                        <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
                     </bm-marker>
                    <!--比例尺控件-->
                    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT" ></bm-scale>
                    <!--缩放控件-->
                    <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>
                    <!-- 地图类型 -->
                    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                    <!--聚合动态添加的点坐标-->
                    <bm-marker-clusterer :averageCenter="true">
                        <bm-marker v-for="marker of markers" :key="marker.code" :position="{lng: marker.lng, lat: marker.lat}" @click="lookDetail(marker)"></bm-marker>
                    </bm-marker-clusterer>
                </baidu-map>
             </el-card>  
        </div>
     </el-col>
   </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import XLSX from 'xlsx'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmMapType from 'vue-baidu-map/components/controls/MapType'

export default {
  components: {
    CountTo,
    BaiduMap,
    BmMarker,
    BmScale,
    BmMapType
  },
  data () {
    return {
        value:50,
        PageModel:{
          pageSize:10,
          curPage:1
        },
        fileTemp:[],
        fileList:{},
        map:{
            center: {lng: 118.802422,lat:32.065631},//'南京市',
            zoom: 10,
            width:'',
            height:'275px'
        },
        markers:[],
    }
   },
   methods: {
    initChart(){
      this.chart = echarts.init(this.$refs.myEchart);
      
    },
    //地图初始化
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.map.width= this.$refs.container.clientWidth+'px';
      this.map.height=275+'px';
      this.getProPositionMap();
    },
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
        //超出最大上传文件数量时的处理方法
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
                    console.log(arr)
                    this.$api.common.getarr(arr).then(res => {
                      console.log(res.ResultData.data);
                    })
                };
                reader.readAsArrayBuffer(f);
            };
            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        }
  }
}
</script>

<style lang="scss">
#container{
  height: 30%;
}

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