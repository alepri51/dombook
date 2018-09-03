<template>
    <dashboard :title="title" :layout="layout" :components="components" :data="{}" @REGISTER-COMPONENT="registerComponent" @date-changed="selected_date = arguments[0]" :date="selected_date"/>
</template>

<script>
    import Layout from '../components/class_layout';
    
    export default {
        extends: Layout,
        /* computed: {
            title() {
                this.route.view === this.component_name && (document.title = 'Новости');
            }
        }, */
        methods: {
            getTitle() {
                return 'Подбор';
            }
        },
        data() {
			return {
                selected_date: void 0,
                layouts: {
                    'sm,xs,md,lg,xl': {
                        layout: {
                            cols: 10,
                            rows: 15
                        },
                        components: [
                            {
                                "id": 1,
                                "x": 0,
                                "y": 0,
                                "w": 10,
                                "h": 2,
                                "available": false,
                                "comp": "selection"
                            },
                            {
                                "id": 2,
                                "x": 0,
                                "y": 2,
                                "w": 4,
                                "h": 13,
                                "available": false,
                                "comp": "list"
                            },
                            {
                                "id": 3,
                                "x": 4,
                                "y": 2,
                                "w": 6,
                                "h": 13,
                                "available": false,
                                "comp": "location"
                            }
                        ]
                    }
                },
				
			}
		}
    }
</script>

<style scoped>
    .v-card {
        margin: auto;
    } 
</style>
