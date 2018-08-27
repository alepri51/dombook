import Widget from './class_widget';

export default {
    extends: Widget,
    methods: {
        registerComponent(name) {
            this.commit('REGISTER_COMPONENT', name);
        }
    }
}

