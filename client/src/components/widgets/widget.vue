<template>
    <v-card class="widget" fill-height tile v-bind="$attrs">
        <v-container fluid grid-list-lg fill-height >
            <v-layout column fill-height>
                <div>
                    <slot name="header"/>
                </div>

                <slot name="divider">
                    <!-- <v-divider/> -->
                </slot>
    
                <v-layout class="content" v-bind="$attrs" id="scroll" @scroll="onScroll">
                    <slot/>
                </v-layout>

                <slot name="footer"/>
                
            </v-layout>
        </v-container>
        <div style="position: absolute; bottom: 2px; right: 16px; font-size: 10px" class="grey--text">{{name}}</div>
    </v-card>
</template>

<script>
    export default {
        props: ['name'],
        data: () => ({
            scroll: 0
        }),
        activated() {
            let element = this.$el.querySelector('#scroll');
            element.scrollTop = this.scroll;
        },
        methods: {
            onScroll(e) {
                this.scroll = e.target.scrollTop;
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
        padding: 0;
        margin: 0;
    }

    .container .layout:only-child {
        margin: 0!important;
    }
    .content {
        overflow: auto;
        margin: 0!important;
        padding: 4px
    }
</style>

