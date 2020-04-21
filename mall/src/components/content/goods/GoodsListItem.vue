<template>
  <div class="goods">
    <div class="goods-item" v-for="(item, index) in goods" :key="index">
      <a :href="item.link">
        <img :src="item.show.img" alt="加载中">
        <div>
          <p>{{item.title}}</p>
          <span class="price" style="color: red;margin:0 20px;">￥{{item.price}}</span>
          收藏:<span class="cllect" style="color: #11c415">{{item.cfav}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goods: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    overflow: hidden;
    font-size: 12px;
  }
  .goods-item{
    width: 48%;
    float: left;
    margin: 1%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
</style>
