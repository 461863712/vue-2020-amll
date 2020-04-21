import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Cart = () => import('../views/shopcart/Shopcart');
const Profile = () => import('../views/profile/Profile');

//安装
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/profile',
    component:Profile
  }
];
//创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history'
});

//导出
export default router
