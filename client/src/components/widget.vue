<template>
    <div class="widget" fill-height>
        <slot/>
        <div style="position: absolute; bottom: 6px; right: 10px; font-size: 10px" class="grey--text">{{name}}</div>
    </div>
</template>

<script>
    import Base from './class_base';

    export default {
        props: ['name'],
        computed: {
        }
    }
</script>

<style scoped>
    .widget {
        width: 100%;
        height: 100%;
    }
</style>

