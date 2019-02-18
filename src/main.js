import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './styles/app.scss';

// plugin for sanitizing `contenteditable` elements <https://github.com/daichirata/vue-sanitize>:
import VueSanitize from "vue-sanitize";
let sanitizeOptions = {
    allowedTags: ['div', 'br']
};

Vue.use(VueSanitize, sanitizeOptions);


Vue.config.productionTip = false;


new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
