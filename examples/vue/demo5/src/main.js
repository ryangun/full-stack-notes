import '../static/css/global.css';
import 'mint-ui/lib/style.css';
import Vue from 'vue';
import App from './App';
import router from './router/index';
import Axios from 'axios';

import Mint from 'mint-ui';
Vue.use(Mint);

const Interface = Axios.create({
    baseURL: 'http://www.sinya.online/api/',
    timeout: 3000
})
Vue.prototype.$axios = Interface;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {
        App
    },
    router,
    template: `<App />
  `
})