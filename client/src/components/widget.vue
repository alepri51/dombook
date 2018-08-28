<template>
    <v-card class="widget" fill-height tile>
        <v-container fluid grid-list-lg fill-height>
            <v-layout column>
                <slot name="header"/>
    
                <slot name="divider">
                    <!-- <v-divider/> -->
                </slot>
    
                <v-layout class="content" v-bind="$attrs" id="scroll-target" >
                    <slot v-scroll:#scroll-target="onScroll"/>
                </v-layout>
            </v-layout>
        </v-container>
        <div style="position: absolute; bottom: 2px; right: 16px; font-size: 10px" class="grey--text">{{name}}</div>
    </v-card>
</template>

<script>
    import Base from './class_base';

    export default {
        props: ['name'],
        methods: {
            onScroll() {
                //this.offsetTop = e.target.scrollTop
                console.log('SCROLLING')
            }
        }
    }
</script>

<style scoped>
    .widget {
        width: 100%;
        height: 100%;
    }

    .container {
        padding: 16px;
    }

    .content {
        overflow: auto;
        margin: 0px!important;
    }
</style>

