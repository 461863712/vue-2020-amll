<template>
  <div class="back-top" @click="backTop">
    <img src="~assets/img/common/top.png" alt="加载中...">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods: {
      backTop() {
        this.$emit('backTop');
      }
    }
  }
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 10px;
    bottom: 49px;
  }
  .back-top img{
    width: 50px;
    height: 50px;
  }
</style>
