<template>
    <widget name="" class="elevation-0">
        <div slot="header1">
            КАРТА
        </div>

        <yandex-map 
            :coords="[54.62896654088406, 39.731893822753904]"
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
                        coords: [54.8, 39.8],
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
