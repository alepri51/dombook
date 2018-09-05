import Base from '../class_base';
//import widget from './widgets/widget';

export default {
    extends: Base,
    components: {
        widget: () => import('./widget')
    },
    activated() {
        console.log('activated', this.entity);
        this.load();
    },
    methods: {
        load() {
            //debugger;

            this.execute({ endpoint: this.endpoint, method: 'get' });
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
            console.log('SIGN CHANGED from:', old, 'TO:', val);
            //val < old && this.load();
            val === 1 && this.load();
        }
    }
}