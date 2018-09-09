import Base from '../class_base';
//import widget from './widgets/widget';

export default {
    extends: Base,
    components: {
        widget: () => import('./widget')
    },
    data() {
        return {
            active: false
        }
    },
    activated() {
        //console.log('activated', this.entity);
        this.active = true;
        this.load();
    },
    deactivated() {
        //console.log('deactivated', this.entity);
        this.active = false;
        //this.load();
    },
    methods: {
        load() {
            //debugger;
            //console.log('LOADING:', this.entity);
            this.active && this.execute({ endpoint: this.endpoint, method: 'get' });
        }
    },
    computed: {
        endpoint() {
            return `${this.entity}${ this.component_id ? ':' + this.component_id : '' }`;
        },
        raw_data() {
            return this.$store.state.entities[this.entity] ? Object.values(this.$store.state.entities[this.entity]) : [];
        },
        filter() {
            return this.raw_data; //переопределить в компоненте если надо фильтровать данные
        }
    },
    watch: {
        'auth.signed': function(val, old) {
            //console.log(`SIGN CHANGED on ${this.entity} from:`, old, 'TO:', val, 'EVENT');
            //val < old && this.load();

            //this.commit('RESET_CACHE');
            val === 1 && this.load();

            if(val === 1 && this.auth.member) {
                console.log('REGISTER EVENT:', `${this.auth.member}:update:${this.entity}`);

                this.$socket.off(this.events.update);

                let update = this.$socket.on(`${this.auth.member}:update:${this.entity}`, (data) => {
                    debugger
                    console.log('SOCKET UPDATE DATA:', data);
                    
                    this.commit('SET_ENTITIES', { method: 'GET', ...data });
                });

                this.events.update = update.id;
            }
        },
        'auth.member': function(val, old) {
            //console.log(`${this.entity} MEMBER CHANGED from:`, old, 'TO:', val);
            !val && this.$socket.off(this.events.update);
        }
    }
}