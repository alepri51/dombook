import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/landing'
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    store.commit('HIDE_MODALS');
    
    let name = to.path.slice(1);
    to.query && store.commit('SET_PATH_QUERY', to.query);
    //debugger
    let [component, rest = ''] = name.split(':');
    let [id, action] = rest.split('.');
    let view = `${component}${ id ? '_' + id : ''}`;

    store.commit('SET_ROUTE', { component, id, action, view });
    store.commit('INIT', name);
    //!store.state.token && await store.dispatch('execute', { cache: false, endpoint: 'signup.silent'});

    store.commit('REGISTER_VIEW', { name: view, view: component });
    store.commit('LOCATION', view);

    next();
});

export default router;
