<template>
  <div class="tab-control">
    <div v-for="(item, index) in tabcontrol" :key="index" @click="controlItem(index)">
      <span :class="{active: index === currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0,
        marginHeight:''
      }
    },
    props: {
      tabcontrol: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      controlItem(index) {
        this.currentIndex = index;
        //index传出去到父组件,做点击切换数据
        this.$emit('tabClick',index);
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    line-height: 40px;
    height: 40px;
    text-align: center;
    font-size: 14px;
  }
  .tab-control div{
    flex: 1;
  }
  .active{
    padding: 1px 3px;
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
  }
</style>
