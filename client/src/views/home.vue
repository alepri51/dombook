<template>
    <dashboard v-if="authenticated" :title="title" :layout="layout" :components="components" :data="{}" @REGISTER-COMPONENT="registerComponent" @date-changed="selected_date = arguments[0]" :date="selected_date"/>
    <div v-else>
        ДОСТУП ЗАКРЫТ
    </div>
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
                return 'Новости';
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
                                "h": 1,
                                "available": false,
                                "comp": "selection"
                            },
                            {
                                "id": 2,
                                "x": 0,
                                "y": 1,
                                "w": 6,
                                "h": 14,
                                "available": false,
                                "comp": "list"
                            },
                            {
                                "id": 3,
                                "x": 6,
                                "y": 1,
                                "w": 4,
                                "h": 14,
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
