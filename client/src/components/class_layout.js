import Widget from './widgets/class_widget';

export default {
    extends: Widget,
    components: {
        dashboard: () => import('./dashboard')
    },
    computed: {
        layout() {
            return this.layouts[this.current_layout].layout;
        },
        components() {
            return this.layouts[this.current_layout].components;
        },
        title() {
            this.route.view === this.component_name && (document.title = this.getTitle());
        },
    },
    methods: {
        getTitle() {
            return 'dombook.ru';
        }
    },
    watch: {
        '$vuetify.breakpoint': function(breakpoint) {
            this.current_layout = breakpoint.name;
        },
        'route': function() {
            //this.title();
        }
    },
    created() {
        this.layouts = Object.keys(this.layouts).reduce((memo, key, inx, arr) => {
            let keys = key.split(',');
            keys.forEach(item => {
                memo[item] = this.layouts[key];
            });

            return memo;
        }, {})
    },
    activated() {
        //debugger
        //this.title && (document.title = this.title);
        //this.title();
        //document.title = this.title;
    },
    data() {
        return {
            current_layout: this.$vuetify.breakpoint.name,
            layouts: {}
        }
    }
}
