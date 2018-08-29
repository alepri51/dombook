<template>
    <dashboard v-if="true"  :layout="layout" :components="components" :data="{}" @REGISTER-COMPONENT="registerComponent"/>
    <div v-else>
        ДОСТУП ЗАКРЫТ
    </div>
</template>

<script>
    import Layout from '../components/class_layout';
    
    export default {
        extends: Layout,
        components: { 
             dashboard: () => import('../components/dashboard') 
        },
        data() {
			return {
				layout: {
					cols: 10,
					rows: 15
				},
				components: [
                    {
                        "id": 1,
                        "x": 1,
                        "y": 0,
                        "w": 6,
                        "h": 2,
                        "available": false,
                        "comp": "selection"
                    },
                    {
                        "id": 2,
                        "x": 1,
                        "y": 2,
                        "w": 6,
                        "h": 13,
                        "available": false,
                        "comp": "scroll"
                    },
                    {
                        "id": 4,
                        "x": 7,
                        "y": 0,
                        "w": 2,
                        "h": 9,
                        "available": false,
                        "comp": "calendar"
                    },
                    {
                        "id": 5,
                        "x": 7,
                        "y": 9,
                        "w": 2,
                        "h": 6,
                        "available": false,
                        "comp": "scroll"
                    }
                ]
			}
		}
    }
</script>

<style scoped>
    .v-card {
        margin: auto;
    } 
</style>
