<template>
 <div>
   <p>{{this.userId}}</p>
 </div>
</template>


<script>


export default {
  data() {
    return {
      userId: this.$route.params.id,//菜单表格数据
    };
  },
}
</script>
