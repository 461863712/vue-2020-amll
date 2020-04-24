<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default() {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        scroll:'',//滚动插件的值
      }
    },
    mounted() {
      /**
       * 1.dom
       * 2.object
       * @type {BScroll}
       */
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,//滚动监听
        pullUpLoad: this.pullUpLoad//下拉加载
      });
      this.scroll.on('scroll', (position) => {
        //监听滚动
        this.$emit('scroll',position)
      });
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('pullingUp', ()=> {
          //监听下拉
          this.$emit('pullingUp');
        })
      }
    },
    methods: {
      //滚动
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      //下拉加载
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      //重新计算高度
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh();
      }
    }
  }
</script>

<style scoped>
  .content{
    overflow: hidden;
  }
</style>
