import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

const BASE_URL = 'https://localhost:8000';

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

const CancelToken = axios.CancelToken;
let requests_cache = new Cache();
let api = void 0;
let repeatQueue = [];

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

        menu: [
            {
                icon: 'fas fa-newspaper',
                name: 'Новости',
                to: 'newslayout'
            },
            {
                icon: '',
                name: 'Статьи',
                to: 'articleslayout'
            },
            {
                icon: '',
                name: 'Структура',
                to: 'structurelayout'
            },
            {
                icon: '',
                name: 'Финансы',
                to: 'payment'
            }
        ],
        notFound: false,
        path_query: {},
        route: {},
        registered_modals: {}
    },
    mutations: {
        RESET_ENTITIES(state) {
            state.entities = {}
        },
        RESET_CACHE(state) {
            console.log('RESET', state.auth ? state.auth.signed : 'NULL');
            //console.log('RESET', state.auth.signed);
            requests_cache.reset();
        },
        INIT(state, view) {
            if(api) return;

            api = axios.create({ 
                baseURL: `${BASE_URL}/api`,
                headers: { 'Cache-Control': 'no-cache' },
	            adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
            });

            state.token = sessionStorage.getItem('token');

            let activeRequests = [];

            let onRequest = (config => {
                console.log('request', config.url, requests_cache.length);
                state.token && (config.headers.common.authorization = state.token);

                config.repeatOnError && repeatQueue.push(config.repeatOnError);

                //debugger
                /* config.cancelToken = new CancelToken(function executor(cancel) {
                    // An executor function receives a cancel function as a parameter
                    activeRequests.push(cancel);
                }); */

                /* if(config.method === 'get' && state.auth && state.auth.signed !== 1) {
                    throw new Error('intercepted:' + config.url);
                } */

                return config;
            });

            let onResponse = (response => {

                let {token, auth, error, entities, _cached, ...rest} = response.data;

                error && (!error.system ? this.commit('SHOW_SNACKBAR', { text: `ОШИБКА: ${error.message}` }) : console.error(`ОШИБКА: ${error.message}`));

                error && this.commit('RESET_CACHE');

                if(error && error.code === 403 && !error.system && auth && auth.signed !== 1) {
                    //this.commit('RESET_CACHE');
                    console.log('SIGN IN SHOW');
                    this.commit('SHOW_MODAL', { signin: void 0 });
                }

                if(!error && repeatQueue.length) {
                    //debugger
                    
                    repeatQueue.forEach(config => {
                        delete config.repeatOnError;
                        api(config)
                    });
                    repeatQueue = [];
                }

                response.error = error; //DO NOT REMOVE
                
                if(!token) {
                    this.commit('RESET_CACHE');
                    this.commit('RESET_ENTITIES');
                    !error && this.dispatch('execute', { cache: false, endpoint: 'signup.silent'});
                }
                else {
                    
                    if(!state.auth || (state.auth && auth.signed !== state.auth.signed)) {
                        auth.signed === 0 && this.commit('RESET_ENTITIES');
                        auth.signed === 0 && this.commit('RESET_CACHE');
                    }
                    else {
                    }

                    if(!_cached) {
                        this.commit('SET_TOKEN', token);
                        this.commit('SET_AUTH', auth);
                        /* error && !error.system && this.commit('SHOW_SNACKBAR', { text: `ОШИБКА: ${error.message}` });

                        if(error && error.code === 403 && !error.system && auth.signed !== 1) {
                            console.log('SIGN IN SHOW');
                            this.commit('SHOW_MODAL', { signin: void 0 });
                        }

                        response.error = error; //DO NOT REMOVE */

                        response.rest = rest && Object.keys(rest).length ? { ...rest } : void 0;
                        response.entities = entities;

                        entities && this.commit('SET_ENTITIES', { entities, method: response.config.method });

                    }

                    
                }

                response.data._cached = !!response.config.cache;
                return response;
            });

            let onError = (error => {
                error.message.indexOf('intercepted') !== -1 ? console.error(`ОШИБКА: ${error.message}`) : this.commit('SHOW_SNACKBAR', { text: `ОШИБКА: ${error.message}` });
            });

            api.interceptors.request.use(onRequest, onError);
            
            api.interceptors.response.use(onResponse, onError);

            this.dispatch('execute', { endpoint: view, method: 'get' });
        },
        LOADING(state, value) {
            state.loading = value;
        },
        REGISTER_VIEW(state, { name, view }) {
            Vue.component(
                name,
                async () => import(`./views/${view}`).catch(() => {
                    return import(`./views/not-found`);
                })
            );
        },
        REGISTER_COMPONENT(state, name) {
            //debugger
            Vue.component(
                name,
                async () => import(`./components/${name}`).catch((err) => {
                    return import(`./components/widgets/${name}`).catch((err) => {
                        return import(`./components/stub`);
                    })
                })
            );
        },
        REGISTER_MODAL(state, name) {
            if(!state.registered_modals[name]) {
                state.registered_modals[name] = true;

                Vue.component(
                    name,
                    async () => import(`./components/modals/${name}`)
                );
            }
        },
        SET_PATH_QUERY(state, query) {
            state.path_query = query;
        },
        SET_ROUTE(state, route) {
            //debugger
            route.id = route.id && parseInt(route.id);
            state.route = route;
        },
        LOCATION(state, view) {
            state.view = view;
            state.notFound = false;
        },
        NOT_FOUND(state) {
            state.notFound = true;
        },
        SHOW_MODAL(state, params) {

            if(!state.modals[name]) {
                let [name] = Object.keys(params);

                let [ data = {}, options ] = Object.values(params);
                
                Vue.set(state.modals, name, { data, options } || {});
            }
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
            this.commit('HIDE_SNACKBAR');
        },
        SHOW_SNACKBAR(state, options) {
            state.snackbar.visible = true;
            Object.assign(state.snackbar, options);
            //console.log(state.snackbar);
        },
        HIDE_SNACKBAR(state) {
            state.snackbar.visible = false;
        },
        MUTATE_ENTITY(state, payload) {
            let { entities, entity, id, deleted } = payload;
            if(entities) {
                if(id) {
                    entities[entity] && entities[entity][id] && deleted ? Vue.delete(state.entities[entity], id) : Vue.set(state.entities[entity], id, entities[entity][id]);
                    !deleted && this.commit('SET_ENTITIES', { entities, method: 'GET' });
                }
                else this.commit('SET_ENTITIES', { entities, method: 'GET' });
            }
        },
        SET_ENTITIES(state, { entities, map, result, entry, method }) {
            if(entities && method.toUpperCase() === 'GET') {
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
        async execute({ commit, state }, { cache = true, method, endpoint, payload, headers, callback, repeatOnError }) {
            //console.log('REQUEST:', endpoint);

            let response;

            headers = headers || {};

            let config = {
                url: endpoint,
                method: method || 'get',
                headers
            };

            config.cache = config.method === 'get' ? cache ? requests_cache : false : false;
            repeatOnError && (config.repeatOnError = config);

            //config.cache = false;
            commit('LOADING', true);

            console.log('EXECUTE:', endpoint, 'CACHE', !!config.cache);
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
