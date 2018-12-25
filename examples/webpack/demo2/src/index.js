import './main.less';
import Vue from 'vue';
import App from './App.vue';

new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App />'
        // render: c => c(App)
})