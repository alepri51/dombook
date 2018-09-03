<template>
    <widget name="" class="elevation-0 pa-2">
        <div slot="header">
            <h3>КАРТА</h3>
        </div>

        <v-divider class="ma-1" slot="divider"/>

        <yandex-map ref="content"
            :coords="[55.749706, 37.598517]"
            zoom="10"
            
            :cluster-options="{
                1: {clusterDisableClickZoom: true}
            }"
            
            
            :placemarks="placemarks"  
            
            @map-was-initialized="initHandler"
        >
        </yandex-map>

    </widget>
</template>

<script>
    import { yandexMap, ymapMarker } from 'vue-yandex-maps'
    import Widget from './class_widget';
    
    export default {
        extends: Widget,
        components: { 
            yandexMap, 
            ymapMarker 
        },
        data() {
            return {
                placemarks: [
                    {
                        coords: [55.749706, 37.598517],
                        properties: {}, // define properties here
                        options: {}, // define options here
                        clusterName: "1",
                        callbacks: { click: function() {} }
                    }
                ]
            }
        },
        methods: {
            initHandler() {
                this.$refs.content.myMap.options.set({
                    suppressMapOpenBlock: true,
                    autoFitToViewport: 'always'
                });
            }
        }
    }
</script>


<style scoped>
    .ymap-container {
        height: inherit;
        width: 100%;
    }

</style>
