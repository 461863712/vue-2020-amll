<template>
  <div class="tab-bar-item">
    <router-link :to="path">
      <div v-if="isActive">
        <slot name="item-icon-active"></slot>
      </div>
      <div v-else>
        <slot name="item-icon"></slot>
      </div>
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
    </router-link>
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
</style>
