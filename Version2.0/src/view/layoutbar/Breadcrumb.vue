<template>
  <div id="main-Breadcrumb" class="main-Breadcrumb">
    <el-breadcrumb>
       <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
       <el-breadcrumb-item>活动管理</el-breadcrumb-item>
       <el-breadcrumb-item>活动列表</el-breadcrumb-item>
       <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  padding: 0 5px 5px;
  position: absolute;
  top: 60px;
  left: 1px;
  right: 1px;
  bottom: 0px;
  // background: rgba(56, 5, 114, 0.5);
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
</style>