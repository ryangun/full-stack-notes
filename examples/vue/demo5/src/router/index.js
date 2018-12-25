import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home/Home';
import Vip from '@/components/Vip/Vip';
import Cart from '@/components/Cart/Cart';
import Search from '@/components/Search/Search';
import NewsList from '@/components/News/NewsList';
Vue.use(VueRouter);

export default new VueRouter({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/vip',
        name: 'vip',
        component: Vip
    }, {
        path: '/cart',
        name: 'cart',
        component: Cart
    }, {
        path: '/search',
        name: 'search',
        component: Search
    }, {
        path: '/news/list',
        name: 'newsList',
        component: NewsList
    }]
})