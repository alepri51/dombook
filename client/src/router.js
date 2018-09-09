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

const hexEncode = function(str){
    var hex, i;

    var result = "";
    for (i=0; i<str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

const hexDecode = function(str){
    var j;
    var hexes = str.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

router.beforeEach(async (to, from, next) => {
/*     debugger
    let from_path = from.fullPath.slice(1);
    let to_path = to.fullPath.slice(1);

    if(hexDecode(from_path) !== to_path) {
        let encode = hexEncode(to_path);
        router.replace({ path: encode, meta: to_path });
    } */

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
