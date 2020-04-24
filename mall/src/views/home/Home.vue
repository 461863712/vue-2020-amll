<template>
  <div id="home">
    <!--导航-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--为了实现吸顶-->
    <div class="tab-control-top" v-show="isTabFixed">
      <tab-control ref="tabControl1" :tabcontrol="tabControl" @tabClick="tabClick"></tab-control>
    </div>
    <scroll class="content" @pullingUp="loadMore" :pull-up-load="true" ref="contentScroll" :probe-type="3" @scroll="scroll">
      <!--轮播图-->
      <home-swiper :banners="banners.list" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!--推荐-->
      <recommend :recommends="recommends.list"></recommend>
      <!--本周流行-->
      <div class="popular">
        <h1>本周流行</h1>
        <recommend :recommends="popular"></recommend>
      </div>
      <!--内容导航-->
      <div class="tab-control-top">
        <tab-control ref="tabControl2" :tabcontrol="tabControl" @tabClick="tabClick"></tab-control>
      </div>
      <!--内容-->
      <goods-list-item :goods="goods[currentType].list"></goods-list-item>
    </scroll>
    <!--调转到顶部-->
    <back-top @backTop="backTop" v-show="backTopShowHide"></back-top>
  </div>
</template>

<script>
  //有导出
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childcomps/HomeSwiper';
  import Recommend from 'components/content/recommend/Recommend';
  import TabControl from 'components/content/tabcontrol/TabControl';
  import GoodsListItem from 'components/content/goods/GoodsListItem';
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/common/backtop/BackTop'
  //无导出
  import {getHomeMultidata, getHomeGoods} from "network/home/home";
  import {debounce} from 'common/utils'

  export default {
    name: "home",
    data() {
      return {
        banners:'',
        recommends:'',
        popular:[{
          "acm": "3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          "image": "https://s10.mogucdn.com/mlcdn/c45406/180913_036dli57aah85cb82l1jj722g887g_225x225.png",
          "link": "http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          "sort": 1,
          "title": "\u5341\u70b9\u62a2\u5238"
        }, {
          "acm": "3.mce.2_10_1dgge.13730.0.ccy5br4OlfK0V.pos_1-m_313899-sd_119",
          "image": "https://s10.mogucdn.com/mlcdn/c45406/180913_25e804lk773hdk695c60cai492111_225x225.png",
          "link": "https://act.mogujie.com/tejiazhuanmai09?acm=3.mce.2_10_1dgge.13730.0.ccy5br4OlfK0V.pos_1-m_313899-sd_119",
          "sort": 2,
          "title": "\u597d\u7269\u7279\u5356"
        }, {
          "acm": "3.mce.2_10_1b610.13730.0.ccy5br4OlfK0W.pos_2-m_260486-sd_119",
          "image": "https://s10.mogucdn.com/mlcdn/c45406/180913_387kgl3j21ff29lh04181iek48a6h_225x225.png",
          "link": "http://act.meilishuo.com/neigouful001?acm=3.mce.2_10_1b610.13730.0.ccy5br4OlfK0W.pos_2-m_260486-sd_119",
          "sort": 3,
          "title": "\u5185\u8d2d\u798f\u5229"
        }, {
          "acm": "3.mce.2_10_1dggg.13730.0.ccy5br4OlfK0X.pos_3-m_313900-sd_119",
          "image": "https://s10.mogucdn.com/mlcdn/c45406/180913_8d4e5adi8llg7c47lgh2291akiec7_225x225.png",
          "link": "http://act.meilishuo.com/wap/yxzc1?acm=3.mce.2_10_1dggg.13730.0.ccy5br4OlfK0X.pos_3-m_313900-sd_119",
          "sort": 4,
          "title": "\u521d\u79cb\u4e0a\u65b0"
        },{
          "acm": "3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          "image": "https://s10.mogucdn.com/mlcdn/c45406/180913_036dli57aah85cb82l1jj722g887g_225x225.png",
          "link": "http://act.meilishuo.com/10dianlingquan?acm=3.mce.2_10_1dggc.13730.0.ccy5br4OlfK0U.pos_0-m_313898-sd_119",
          "sort": 1,
          "title": "\u5341\u70b9\u62a2\u5238"
        }, {
          "acm": "3.mce.2_10_1dgge.13730.0.ccy5br4OlfK0V.pos_1-m_313899-sd_119",
          "image": "https://s10.mogucdn.com/mlcdn/c45406/180913_25e804lk773hdk695c60cai492111_225x225.png",
          "link": "https://act.mogujie.com/tejiazhuanmai09?acm=3.mce.2_10_1dgge.13730.0.ccy5br4OlfK0V.pos_1-m_313899-sd_119",
          "sort": 2,
          "title": "\u597d\u7269\u7279\u5356"
        }, {
          "acm": "3.mce.2_10_1b610.13730.0.ccy5br4OlfK0W.pos_2-m_260486-sd_119",
          "image": "https://s10.mogucdn.com/mlcdn/c45406/180913_387kgl3j21ff29lh04181iek48a6h_225x225.png",
          "link": "http://act.meilishuo.com/neigouful001?acm=3.mce.2_10_1b610.13730.0.ccy5br4OlfK0W.pos_2-m_260486-sd_119",
          "sort": 3,
          "title": "\u5185\u8d2d\u798f\u5229"
        }, {
          "acm": "3.mce.2_10_1dggg.13730.0.ccy5br4OlfK0X.pos_3-m_313900-sd_119",
          "image": "https://s10.mogucdn.com/mlcdn/c45406/180913_8d4e5adi8llg7c47lgh2291akiec7_225x225.png",
          "link": "http://act.meilishuo.com/wap/yxzc1?acm=3.mce.2_10_1dggg.13730.0.ccy5br4OlfK0X.pos_3-m_313900-sd_119",
          "sort": 4,
          "title": "\u521d\u79cb\u4e0a\u65b0"
        }],
        tabControl:['流行','新款','精选'],
        currentType: 'pop',
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        backTopShowHide: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      Recommend,
      TabControl,
      GoodsListItem,
      Scroll,
      BackTop
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
      //因为图片异步加载，出现滚动到一半就不能下拉，所以要重新计算scroll高度
      //判断图片是否加载完成
    },
    mounted() {
      //图片加载完成的事件监听
      const refresh = debounce(this.$refs.contentScroll.refresh,20);
      this.$bus.$on('imageLoad', () => {
        // this.$refs.contentScroll.refresh();
        refresh();//防抖
      });
    },
    methods: {
      /**
       * 网络请求
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner;
          this.recommends = res.data.recommend;
        });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          //下拉加载更多
          this.$refs.contentScroll.finishPullUp();
        })
      },
      /**
       * 事件监听
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
          default:
            break;
        }
        //同步吸顶和内容导航
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backTop() {
        //当前滚动区域的scroll
        this.$refs.contentScroll.scrollTo(0, 0, 500);
      },
      scroll(position) {
        // position.y < -1000 ? this.backTopShowHide=true : this.backTopShowHide=false;
        //判断回到顶部按钮是否显示
        this.backTopShowHide = position.y < -1000;
        //决定内容导航石头吸顶
        this.isTabFixed = position.y < -this.tabOffsetTop;
      },
      loadMore() {
        //下拉加载数据
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
        //获取内容导航的top值
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
    },
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: var(--color-background);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index:9999
  }
  .popular h1{
    font-size: 16px;
    text-align: center;
  }
  .content{
    height: calc(100% - 49px);
  }
</style>
