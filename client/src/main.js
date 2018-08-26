import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
 
import App from './App.vue';
import router from './router';
import store from './store';

import 'vuetify/dist/vuetify.min.css';

import './../public/custom.css';

Vue.use(Vuetify, {
    theme: {
        primary: colors.indigo.darken2,
        secondary: colors.amber.darken2,
        accent: colors.green.darken2,
        'primary-light': '#F5F5F5',
        error: colors.red.darken2,
        inactive: colors.blueGrey.base,
        'default-action': colors.green.darken2
    }
});

Vue.config.productionTip = false;

Vue.prototype.$colors = colors;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
