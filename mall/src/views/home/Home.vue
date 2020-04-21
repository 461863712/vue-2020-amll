<template>
  <div id="home">
    <!--导航-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--轮播图-->
    <home-swiper :banners="banners.list"></home-swiper>
    <!--推荐-->
    <recommend :recommends="recommends.list"></recommend>
    <!--本周流行-->
    <div class="popular">
      <h1>本周流行</h1>
      <recommend :recommends="popular"></recommend>
    </div>
    <!--内容导航-->
    <div class="tab-control-top">
      <tab-control :tabcontrol="tabControl" @tabClick="tabClick"></tab-control>
    </div>
    <!--内容-->
    <goods-list-item :goods="goods[currentType].list"></goods-list-item>
  </div>
</template>

<script>
  //有导出
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childcomps/HomeSwiper';
  import Recommend from 'components/content/recommend/Recommend';
  import TabControl from 'components/content/tabcontrol/TabControl';
  import GoodsListItem from 'components/content/goods/GoodsListItem';
  //无导出
  import {getHomeMultidata, getHomeGoods} from "network/home/home";

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
        }
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      Recommend,
      TabControl,
      GoodsListItem
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
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
          console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
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
      }
    },
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
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
  /*固定导航*/
  .tab-control-top{
    background-color: var(--color-background);
    position: sticky;
    top: 44px;
  }
</style>
