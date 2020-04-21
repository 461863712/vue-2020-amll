<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="加载中">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomereCommend",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    width: 100%;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    width: 25%;
    float: left;
    margin: 5px 0 10px 0;
  }
  .recommend-item img{
    width: 70px;
    height: 70px;
  }
</style>
