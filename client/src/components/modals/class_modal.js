import Base from '../class_base';

export default {
    extends: Base,
    data() {
        return {
            form: {},
            options: {},
            defaults: {}
        }
    },
    computed: {
    },
    methods: {
        beforeSave(data) {
            return data;
        },        
        submit() {
            //debugger
            let validated = this.options.remove || (this.$refs.form && this.$refs.form.validate()) || !this.$refs.form;

            let headers = {};
            let data = void 0;

            this.form = this.beforeSave(this.form);

            if(this.form.blob instanceof FormData) {
                headers = {
                    'content-type': 'multipart/form-data'
                };

                data = Object.keys(this.form).reduce((memo, key) => {
                    key !== 'blob' && memo.has(key) ? memo.set(key, this.form[key]) : memo.append(key, this.form[key]);

                    return memo;
                }, this.form.blob);
            }


            validated ? 
                this.execute({ 
                    method: this.options.remove ? 'delete' : 'post',
                    headers,
                    endpoint: `${this.entity}.save`,
                    payload: data || this.form, 
                    callback: (response) => {
                        if(!response.error) {
                            this.commit('HIDE_MODAL', { [this.entity]: void 0 });
                            this.options.remove && this.$emit('removed', this.form._id);
                            !this.form._id && this.$emit('appended', this.form._id);

                            this.$refs.form && this.commit('MUTATE_ENTITY', { entities: response.entities, entity: this.entity, id: this.form._id, deleted: this.options.remove });
                            //this.commit('MUTATE_ENTITY', { entities: response.entities, entity: this.entity, id: this.form._id, deleted: this.options.remove });
                        }
                    }
                })
                :
                this.commit('SHOW_SNACKBAR', {text: 'Не корректно введены данные' });
        }
    },
    computed: {
        visible: { 
            get() {
                //debugger
                let { data: modal_data, options = {} } = this.state.modals[this.entity] || { data: void 0, options: void 0 };
                this.options = options;

                let defaults = JSON.parse(JSON.stringify(this.defaults || {}));

                //modal_data = modal_data || {};
                modal_data = modal_data && {...defaults, ...modal_data};
                this.form = JSON.parse(JSON.stringify(modal_data || defaults));

                //return !!Object.keys(modal_data).length;
                return !!modal_data;

                //typeof modal_data === 'object' && (Object.keys(modal_data).length ? this.form = JSON.parse(JSON.stringify(modal_data)) : this.form = JSON.parse(JSON.stringify(this.defaults || {})));
                
                //return !!modal_data;
                //return false
            },
            set: () => {}
        },
    },
    created() {
        ////console.log('CREATED', this.entity);
        //this.load();
        //debugger
        
    },
    watch: {
        'visible': function(val) {
            val && (this.defaults = this.entities.default && this.entities.default[this.entity] || {});
        }
    }
}