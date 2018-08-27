import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

const BASE_URL = 'https://localhost:8001';

//debugger;
const socket = io(BASE_URL);

Vue.prototype.$socket = socket;

socket.on('connect', () => {
    console.log('SOCKET CONNECTED:', socket.connected); // true
});

socket.on('disconnect', (data) => {
    console.log('SOCKET DISCONNECTED:', data);
});

import axios from 'axios';
import deepmerge from 'deepmerge';
import { cacheAdapterEnhancer, throttleAdapterEnhancer, Cache } from 'axios-extensions';

Vue.use(Vuex);

let requests_cache = new Cache();
let api = void 0;

export default new Vuex.Store({
    strict: true,
    state: {
        loading: false,
        view: '',
        modals: {},
        
        token: void 0,
        auth: void 0,
        entities: {},

        snackbar: {
            visible: false,
            color: 'red darken-2',
            timeout: 4000,
            text: '',
            caption: 'Закрыть',
            icon: '',
            vertical: false
        },

        notFound: false
    },
    mutations: {
        CLEAR_CACHE(state) {
            requests_cache.reset();
            state.entities = {}
        },
        RESET_CACHE(state) {
            requests_cache.reset();
        },
        INIT(state) {
            if(api) return;

            api = axios.create({ 
                baseURL: `${BASE_URL}/api`,
                headers: { 'Cache-Control': 'no-cache' },
	            adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
            });

            state.token = sessionStorage.getItem('token');

            let onRequest = (config => {
                state.token && (config.headers.common.authorization = state.token);
                return config;
            });

            let onResponse = (response => {

                let {token, auth, error, entities, _cached, ...rest} = response.data;

                //token MUST EXISTS!
                this.commit('SET_TOKEN', token);
                this.commit('SET_AUTH', auth);

                error && !error.system && this.commit('SHOW_SNACKBAR', { text: `ОШИБКА: ${error.message}` });
                response.error = error; //DO NOT REMOVE

                //оставшиеся данные
                response.rest_data = { ...rest };
                
                //SAVE CACHED STATE IF IS
                response.data._cached = !!response.config.cache;

                return response;
            });

            let onError = (error => {
                this.commit('SHOW_SNACKBAR', { text: `ОШИБКА: ${error.message}` });
            });

            api.interceptors.request.use(onRequest, onError);
            
            api.interceptors.response.use(onResponse, onError);

        },
        LOADING(state, value) {
            state.loading = value;
        },
        REGISTER_VIEW(state, name) {
            Vue.component(
                name,
                async () => import(`./views/${name}`).catch(() => {
                    return import(`./views/not-found`);
                })
            );
        },
        REGISTER_COMPONENT(state, name) {
            Vue.component(
                name,
                async () => import(`./components/${name}`).catch((err) => {
                    console.error(err);
                    return import(`./components/stub`);
                })
            );
        },
        LOCATION(state, view) {
            //this.dispatch('execute', { endpoint: view, method: 'get' });

            state.view = view;
            state.notFound = false;
        },
        NOT_FOUND(state) {
            state.notFound = true;
        },
        SHOW_MODAL(state, params) {

            let [name] = Object.keys(params);

            let [ data = {}, options ] = Object.values(params);
            
            Vue.set(state.modals, name, { data, options } || {});
        },
        HIDE_MODAL(state, params) {
            let name = Object.keys(params)[0];
            state.modals[name] = false;
        },
        HIDE_MODALS(state) {
            state.modals = {};
        },
        SET_TOKEN(state, token) {
            //token ? sessionStorage.setItem('token', token) : sessionStorage.removeItem('token');

            if(token) { //ONLY SET AND SAVE TOKEN, NOT ALLOWED TO REMOVE DUE TO REMEMBER ANY USER
                sessionStorage.setItem('token', token);
                state.token = token;
            }
        },
        SET_AUTH(state, auth) {
            state.auth = auth;
        },
        SHOW_SNACKBAR(state, options) {
            state.snackbar.visible = true;
            Object.assign(state.snackbar, options);
            //console.log(state.snackbar);
        },
        HIDE_SNACKBAR(state) {
            state.snackbar.visible = false;
        },
        SET_ENTITIES(state, { entities, map, result, entry, method }) {
            if(entities) {
                //debugger;
                let merge = Object.keys(entities).length ? deepmerge(state.entities, entities || {}, {
                    arrayMerge: function (destination, source, options) {
                        //debugger;
                        //ALL ARRAYS MUST BE SIMPLE IDs HOLDER AFTER NORMALIZE
                        if(method.toUpperCase() === 'DELETE') {
                            if(destination.length) {
                                return destination.filter(id => source.indexOf(id) === -1);
                            }
                            else {
                                return source;
                            }
                        }

                        let a = new Set(destination);
                        let b = new Set(source);
                        let union = Array.from(new Set([...a, ...b]));

                        return union;
                    }
                })
                :
                {};

                Object.keys(merge).length && Vue.set(state, 'entities',  merge);
            }
        },
    },
    actions: {
        async execute({ commit, state }, { cache = true, method, endpoint, payload, headers, callback }) {
            console.log('REQUEST:', endpoint);

            let response;

            headers = headers || {};

            let config = {
                url: endpoint,
                method: method || 'get',
                headers
            };

            config.cache = config.method === 'get' ? cache ? requests_cache : false : false;

            commit('LOADING', true);

            try {

                config.method === 'get' ? config.params = payload : config.data = payload;
                response = await api(config);
                
            }
            catch(err) {
                console.log('ERROR', err);
            };

            commit('LOADING', false);            

            if(callback) 
                callback(response); 
                else return response;
        }
    }
});
