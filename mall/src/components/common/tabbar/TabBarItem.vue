<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,//活跃路由
      activeColor: {//字体颜色
        type: String,
        default: 'red'
      }
    },
    data() {
      return {

      }
    },
    computed: {
      isActive() {
        //活跃路由
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        //字体颜色
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // this.$router.replace(this.path)
        this.$router.push(this.path);//这个更改需要在router/index配置，不然重复点击tabbar会报错
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin: 3px 0 0 0;
  }
</style>
