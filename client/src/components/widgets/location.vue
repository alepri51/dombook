<template>
    <widget name="" class="elevation-0 pa-2" >
        <!-- <div slot="header">
            <div class="ui label secondary white--text">КАРТА</div>
        </div>

        <v-divider class="ma-1" slot="divider"/> -->

        <yandex-map ref="content"
            :coords="[55.749706, 37.598517]"
            zoom="10"
            
            :cluster-options="{
                1: {clusterDisableClickZoom: true}
            }"
            
            
            :placemarks="placemarks"  
            
            @map-was-initialized="initHandler"

            style="border: 1px solid #ddd"
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
