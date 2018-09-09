
export default {
    data() {
        let [entity, id] = this.$options._componentTag.split('_');

        return {
            loaded: false,
            events: {},
            entity,
            component_name: this.$options._componentTag,
            component_id: id || this.$store.state.route.id
        }
    },
    async created() {

        /* if(this.auth.member) {
            //console.log('REGISTER EVENT:', `${this.auth.member}:update:${this.entity}`);

            this.$socket.off(this.events.update);

            let update = this.$socket.on(`${this.auth.member}:update:${this.entity}`, (data) => {
                //console.log('SOCKET UPDATE DATA:', data);
                
                this.commit('SET_ENTITIES', { method: 'GET', ...data });
            });

            this.events.update = update.id;
        } */
    },
    watch: {
        'auth.signed': function(val, old) {
            //[0, 1].includes(val) && this.commit('RESET_CACHE');
            //val === 0 && this.commit('RESET_ENTITIES');
            //old === 0 && val === 1 && this.commit('RESET_ENTITIES');
        }
    },
    methods: {
        execute(...args) {
            return this.$store._actions.execute[0](...args);
        },
        commit(...args) {
            return this.$store.commit(...args);
        },
        registerComponent(name) {
            this.commit('REGISTER_COMPONENT', name);
        }
    },
    computed: {
        state() {
            return this.$store.state;
        },
        entities() {
            return this.$store.state.entities;
        },
        auth() {
            return this.state.auth || {};
        },
        authenticated() {
            //debugger;
            return this.auth ? this.auth.signed && this.auth.signed !== 0 : false;
        },
        route() {
            return this.state.route;
        },
        BASE_URL() {
            return this.state.BASE_URL;
        }
    }
}

