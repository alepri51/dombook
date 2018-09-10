import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import SuiVue from 'semantic-ui-vue';
 
import App from './App.vue';
import router from './router';
import store from './store';

import 'semantic-ui-css/semantic.min.css';
import 'vuetify/dist/vuetify.min.css';

import './../public/custom.css';

Vue.use(SuiVue);

Vue.use(Vuetify, {
    theme: {
        primary: colors.lime.darken1,
        secondary: colors.deepPurple.darken1,
        accent: colors.deepOrange.base,
        error: colors.red.accent4,
        warning: colors.yellow.accent4,
        info: colors.lightBlue.accent4,
        success: colors.green.darken2,

        background: '#f5f5f5',
        unimportant: colors.blueGrey.base,
        transparent: colors.teal.lighten5,
        scroll: colors.cyan.lighten4,
        scrollColor: colors.lime.lighten1,
    }
});

Vue.config.productionTip = false;

Vue.prototype.$colors = colors;

new Vue({
    router,
    store,
    
    render: h => h(App)
}).$mount('#app');
