<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childcomps/DetailNavBar'
  export default {
    name: "Detail",
    data() {
      return{
        id: ''
      }
    },
    components: {
      DetailNavBar
    },
    created() {
      //获取传参id
      this.id = this.$route.params.id
    }
  }
</script>

<style scoped>

</style>
