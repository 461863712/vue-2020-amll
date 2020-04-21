<template>
  <div id="app">
    <div id="tab-bar" :style="locationStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    location: String//tabbar位置
  },
  computed: {
    locationStyle() {
      //tabbar位置,只有top和bottom两个位置
      return this.location === 'top' ? {top: 0} : {bottom: 0};
    }
  }
}
</script>

<style scoped>
  #app{
    padding-bottom: 52px;
  }
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    border-top: 3px solid #f3f3f3;
  }
</style>
