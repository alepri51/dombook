import Base from './class_base';
import widget from './widget';

export default {
    extends: Base,
    components: {
        widget
    },
    async created() {
        //this.sign.AUTHORIZED && await this.execute({ endpoint: `${this.entity}` });
    },
    methods: {
    },
    computed: {
        raw_data() {
            return this.$store.state.entities[this.entity] ? Object.values(this.$store.state.entities[this.entity]) : [];
        },
        filter() {
            return this.raw_data; //переопределить в компоненте если надо фильтровать данные
        }
    },
    watch: {

    }
}