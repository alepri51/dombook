
export default {
    data() {
        return {
            loaded: false,
            events: {},
            entity: this.$options._componentTag
        }
    },
    async created() {
        /* if(this.auth.member) {
            console.log('REGISTER EVENT:', `${this.auth.member}:update:${this.entity}`);

            this.$socket.off(this.events.update);

            let update = this.$socket.on(`${this.auth.member}:update:${this.entity}`, (data) => {
                console.log('SOCKET UPDATE DATA:', data);
                
                this.commit('SET_ENTITIES', { method: 'GET', ...data });
            });

            this.events.update = update.id;
        } */
    },
    watch: {
        
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
        sign() {
            return this.$store.state.sign;
        },
        authorized() {
            return !this.sign.UNAUTHORIZED;
        },
        state() {
            return this.$store.state;
        },
        api() {
            return this.$store.state.api;
        },
        auth() {
            return this.$store.state.auth || {name: 'Аноним'};
        },

        entities() {
            return this.$store.state.entities;
        }

    }
}

